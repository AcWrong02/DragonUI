import { render, h } from "vue";
import type { createMessageProps, MessageContext } from "./types";
import MessageConstructor from "./Message.vue";

let seed = 1;
const instances: MessageContext[] = [];

export const createMessage = (props: createMessageProps) => {
  const id = `message-${seed++}`;

  const container = document.createElement("div");

  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx !== -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };

  const newProps = { ...props, onDestroy: destroy };

  const vnode = h(MessageConstructor, newProps);

  render(vnode, container);

  //   document.body.appendChild(container);
  document.body.appendChild(container.firstElementChild!);

  const instance = {
    id,
    vnode,
    props: newProps,
  };
  instances.push(instance);
  return instance;
};

export const getLastInstance = () => {
  return instances[instances.length - 1];
};
