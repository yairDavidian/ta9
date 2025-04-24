import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
