export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "small";

export type NativeType = "button" | "reset" | "submit";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
}
