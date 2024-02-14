export type SwitchValueType = boolean | string | number;

export interface SwitchProps {
  modelValue: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: "small" | "medium" | "large";
}

export interface SwitchEmits {
  (e: "change", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
}
