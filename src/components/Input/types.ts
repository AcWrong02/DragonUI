export interface InputProps {
  modelValue?: string | number | null | undefined;
  type?: string;
  size?: "large" | "small";
  clearable?: boolean;
  showPassword?: boolean;
  disabled?: boolean;
}
