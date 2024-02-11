export interface InputProps {
  modelValue?: string | number | null | undefined;
  type?: string;
  size?: "large" | "small";
  clearable?: boolean;
  showPassword?: boolean;
  disabled?: boolean;
}

export interface InputEmits {
  (e: "update:modelValue", value: string | number | null | undefined): void;
  (e: "input", value: string): void;
  (e: "change", value: string | number): void;
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "clear"): void;
}
