import type { VNode, ComponentInternalInstance } from "vue";

export interface MessageProps {
  message?: string | VNode;
  duration?: number; //消息框多久会关闭，为0则不会自动关闭
  type?: "success" | "error" | "warning" | "info";
  showClose?: boolean; //是否显示关闭按钮
  onDestroy: () => void;
  id: string;
  offset?: number;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
}

export type createMessageProps = Omit<MessageProps, "onDestroy" | "id">;
