import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { getColumns } from '../../configs/columns.config';
import { columnTypeEnum } from '../../enums/table.enum';
import { TodosStore } from '../../store/data.store';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  store = inject(TodosStore);
  columnTypeEnum = columnTypeEnum;
  configColumns = getColumns();
  handleUpdate = output<string>();
  handleDelete = output<void>();

  handleClick(id: string) {
    this.handleUpdate.emit(id);
  }

  removeItem(id: string) {
    this.store.deleteItem(id);
    this.handleDelete.emit();
  }
}
