import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TileTodosComponent } from '../tile-todos/tile-todos.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { TodosStore } from '../../store/data.store';
import { MatIconButton } from '@angular/material/button';
import { ButtonComponent } from '../base-components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../base-components/snack-bar/snack-bar.component';
const DURATION = 5;
@Component({
  selector: 'app-dashboard',
  imports: [
    ButtonComponent,
    TodoListComponent,
    TileTodosComponent,
    MatIconButton,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    MatInputModule,
    TodoFormComponent,
    PaginationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor() {
    effect(() => {
      this.store.setFilter(this.searchValue());
      if (this.viewMode()) {
        this.store.setCurrentPage(1);
      }
    });
  }
  ngOnInit(): void {
    this.store.getTodos();
  }
  private _snackBar = inject(MatSnackBar);
  store = inject(TodosStore);
  openTodoForm = signal(false);
  searchValue = signal<string>('');
  itemId = signal<string>('');
  viewMode = signal<'list' | 'tile'>('list');

  closeForm() {
    this.openTodoForm.set(false);
    this.itemId.set('');
  }
  handleUpdate(id: string) {
    this.openTodoForm.set(true);
    this.itemId.set(id);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: DURATION * 1000,
      data: {
        message: 'Todo deleted successfully',
        action: 'Close',
      },
    });
  }
}
