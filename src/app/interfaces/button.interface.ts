type ButtonType = 'button' | 'menu' | 'reset' | 'submit';
export interface ButtonProps {
  color?: string;
  disabled?: boolean;
  title?: string;
  type?: ButtonType;
  icon?: string;
}
