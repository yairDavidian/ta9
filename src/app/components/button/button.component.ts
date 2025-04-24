import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonProps } from '../../interfaces/button.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  buttonProps = input<ButtonProps>({
    color: 'primary',
    title: 'Click me',
    type: 'button',
    icon: 'home',
    disabled: false,
  });
  handleClick = output<void>();
}
