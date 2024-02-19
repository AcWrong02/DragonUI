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

export interface FormItemRule extends RuleItem {
  trigger?: string;
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

export interface FormItemContext {
  validate: (trigger?: string) => any;
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol("formContextKey");

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol("formItemContextKey");
