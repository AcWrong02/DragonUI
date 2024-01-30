import { render, h } from "vue";
import type { createMessageProps } from "./types";
import MessageConstructor from "./Message.vue";

export const createMessage = (props: createMessageProps) => {
  const container = document.createElement("div");

  const destroy = () => {
    render(null, container);
  }

  const newProps = { ...props, onDestroy:destroy };

  const vnode = h(MessageConstructor, newProps);

  render(vnode, container);

//   document.body.appendChild(container);
  document.body.appendChild(container.firstElementChild!);
};
