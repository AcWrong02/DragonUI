export interface SwitchProps {
  modelValue: boolean;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  name?: string;
  id?: string;
  size?: "small" | "medium" | "large";
}

export interface SwitchEmits {
  (e: "change", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
}
