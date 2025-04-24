import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { TodosStore } from '../../store/data.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tile-todos',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './tile-todos.component.html',
  styleUrl: './tile-todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileTodosComponent {
  store = inject(TodosStore);
  handleUpdate = output<string>();
  handleDelete = output<void>();
  removeItem(id: string) {
    this.store.deleteItem(id);
    this.handleDelete.emit();
  }
  handleClick(id: string) {
    this.handleUpdate.emit(id);
  }
}
