import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TodosStore } from '../../store/data.store';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  imports: [MatIconModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  constructor() {
    effect(() => {
      this.store.setPageSize(this.selectedValue());
    });
  }
  store = inject(TodosStore);
  pages: number[] = [3, 5, 10];
  pageSize = this.store.pageSize;
  currentPage = this.store.currentPage;
  filteredItems = this.store.filteredItems;
  selectedValue = signal<number>(5);
}
