import type { Placement, Options } from "@popperjs/core";
export interface TooltipProps {
  content?: string; // tooltip显示的内容
  trigger?: "hover" | "click"; // tooltip的触发方式
  placement?: Placement; // tooltip显示的位置
  manual?: boolean; // 是否是手动触发
  popperOptions?: Partial<Options>; // Tooltip 的弹出层的配置参数
  transition?: string; // 定义渐变动画的类名
  openDelay?: number; // 延迟出现的时长，单位毫秒
  closeDelay?: number; // 延迟关闭的时长，单位毫秒
}

export interface TooltipEmits {
  (e: "visible-change", value: boolean): void; //弹出层显示与隐藏的时候触发
  (e: "click-outside", value: boolean): void; // 点击外部的时候触发
}

export interface TooltipInstance {
  show: () => void; //手动控制Tooltip弹出层的显示
  hide: () => void; //手动控制Tooltip弹出层的隐藏
}
