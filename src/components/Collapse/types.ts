import type { Ref, InjectionKey } from "vue";
export type NameType = number | string;

export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean; //是否支持手风琴模式
}

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

export interface CollapseEmits {
  (e: "update:modelValue", values: NameType[]): void;
  (e: "change", values: NameType[]): void;
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol("collapseContext");
