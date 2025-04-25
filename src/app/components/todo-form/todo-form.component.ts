import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TodosStore } from '../../store/data.store';
import { Todo } from '../../model/todo.model';
import { ButtonComponent } from '../base-components/button/button.component';

@Component({
  selector: 'app-todo-form',
  imports: [
    MatIconModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimized change detection
})
export class TodoFormComponent implements OnInit {
  ngOnInit(): void {
    // If an item ID is passed, it's edit mode: populate form with existing data
    if (this.itemId()) {
      const todo = this.store.getItemById(this.itemId());
      if (todo) {
        this.valueName.set(todo.name);
        this.valueDesc.set(todo.description);
        this.createDate.set(todo.createDate);
        this.colorPicker = todo.color;
      }
    }
  }

  store = inject(TodosStore);
  // Form fields as signals (reactive state)
  valueName = signal<string>(''); // Holds the name input value
  valueDesc = signal<string>(''); // Holds the description input value
  createDate = signal<Date>(new Date()); // Tracks creation date
  colorPicker = '#FFFFFF'; // Bound to the color picker UI
  closeForm = output<boolean>();
  itemId = input<string>('');

  onSubmit() {
    // Generate ID if new, reuse existing ID if editing
    const id = this.itemId() ? this.itemId() : new Date().getTime().toString();

    // Reuse original creation date if editing, else use current time
    const createDate = this.itemId() ? this.createDate() : new Date();

    // Construct the Todo object
    const todo: Todo = {
      id,
      name: this.valueName(),
      description: this.valueDesc(),
      color: this.colorPicker,
      createDate,
      lastUpdate: new Date(),
      createdBy: 'Yair', // Hardcoded creator name
    };

    // Call store method to add or update the todo
    this.itemId()
      ? this.store.updateItem(this.itemId(), todo)
      : this.store.addItem(todo);

    // Emit event to close the form after submission
    this.closeForm.emit(false);
  }
}
