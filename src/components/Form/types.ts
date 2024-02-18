import type { InjectionKey } from "vue";
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";

export interface FormItemProps {
  label: string;
  prop?: string;
}

export type FormRules = Record<string, RuleItem[]>;

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormProps {
  model: Record<string, any>;
  rules: Record<string, any>;
}

export interface FormContext extends FormProps {}

export const formContextKey: InjectionKey<FormContext> =
  Symbol("formContextKey");
