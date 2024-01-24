import type { ButtonType, ButtonSize } from "../Button/types";
import type { Placement } from "@popperjs/core";
export interface dropDownProps {
  splitButton?: boolean;
  type?: ButtonType; //仅在splitButton为true时生效
  size?: ButtonSize; //仅在splitButton为true时生效
  disabled?: boolean; //禁用下拉菜单
  placement?: Placement; //下拉菜单的位置
  trigger?: "hover" | "click"; //下拉菜单的触发方式
}

export interface dropDownEmits {
  (e: "change", value: boolean): void; //弹出层显示与隐藏的时候触发
  (e: "click"): void; // split-button 为 true 时，点击左侧按钮的回调
}

export interface dropDownItemProps{
  icon?:string;//自定义菜单图标
  disabled?:boolean; //是否禁用
  divided?:boolean; //是否显示分割线
  label?:string; //菜单项的文本
}