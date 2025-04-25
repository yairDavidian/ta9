import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { Todo } from '../model/todo.model';
import { DataService } from '../services/data.service';

type DataState = {
  todos: Todo[];
  filter: string;
  pageSize: number;
  currentPage: number;
};

const initialState: DataState = {
  todos: [],
  filter: '',
  pageSize: 5,
  currentPage: 1,
};

export const TodosStore = signalStore(
  { providedIn: 'root' },

  // 1. Initialize the store state with default values
  withState<DataState>(initialState),

  // 2. Define computed properties that reactively update
  withComputed(({ todos, filter, pageSize, currentPage }) => {
    const filtered = computed(() =>
      todos().filter(
        (item) =>
          item.name.toLowerCase().includes(filter().toLowerCase()) ||
          item.description.toLowerCase().includes(filter().toLowerCase())
      )
    );

    return {
      filteredItems: computed(() => {
        const start = (currentPage() - 1) * pageSize();
        return filtered().slice(start, start + pageSize());
      }),
      maxPage: computed(() => Math.ceil(filtered().length / pageSize())),
    };
  }),

  // 3. Define all the methods to interact with and modify the store
  withMethods((store, dataService = inject(DataService)) => ({
    // Fetch todos from the server and update the store
    async getTodos() {
      (await dataService.getTodos()).subscribe((data) => {
        patchState(store, { todos: data });
      });
    },

    // Add a new todo item to the beginning of the list
    addItem(item: Todo) {
      patchState(store, { todos: [item, ...store.todos()] });
    },

    // Find and return a todo item by its ID
    getItemById(id: string) {
      return store.todos().find((item) => item.id === id);
    },

    // Update a specific todo item by merging new values
    updateItem(id: string, item: Todo) {
      const todos = store
        .todos()
        .map((todo) => (todo.id === id ? { ...todo, ...item } : todo));
      patchState(store, { todos });
    },

    // Delete a todo item by ID and adjust the current page if the list becomes empty
    deleteItem(id: string) {
      const todos = store.todos().filter((item) => item.id !== id);
      patchState(store, { todos });

      // If deleting an item results in an empty page, move back a page
      if (store.todos().length && store.filteredItems().length === 0) {
        patchState(store, {
          currentPage: store.currentPage() - 1,
        });
      }
    },

    // (Unused) Filters todos and immediately patches the todos list with matching items
    // This overrides the original todos, which may be unintended
    filterItems(value: string) {
      const filter = value.toLowerCase();
      const todos = store
        .todos()
        .filter(
          (item) =>
            item.name.toLowerCase().includes(filter) ||
            item.description.toLowerCase().includes(filter)
        );
      patchState(store, { todos });
    },

    // Sets the filter value and optionally resets to page 1
    setFilter(filter: string, page: number = 1) {
      patchState(store, { filter });
    },

    // Updates the number of items per page and resets to page 1
    setPageSize(size: number) {
      patchState(store, { pageSize: size, currentPage: 1 });
    },

    // Set the current page number
    setCurrentPage(page: number) {
      patchState(store, { currentPage: page });
    },
  }))
);
