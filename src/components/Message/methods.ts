import { render, h, shallowReactive, watch } from "vue";
import type { createMessageProps, MessageContext } from "./types";
import MessageConstructor from "./Message.vue";
import useZindex from "../../hooks/useZindex";

let seed = 1;
const instances: MessageContext[] = shallowReactive([]);

export const createMessage = (props: createMessageProps) => {
  const { nextZindex } = useZindex()

  const id = `message-${seed++}`;

  const container = document.createElement("div");

  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    console.log('delete instance idx--', idx);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };

  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visiable.value = false;
    }
  };

  const newProps = { ...props, id, onDestroy: destroy, zIndex: nextZindex() };

  const vnode = h(MessageConstructor, newProps);

  render(vnode, container);

  //   document.body.appendChild(container);
  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;

  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy,
  };
  instances.push(instance);
  return instance;
};

watch(instances, (value)=>{
  console.log("new instances: " ,value)
})

export const getLastInstance = () => {
  return instances[instances.length - 1];
};

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) return 0;
  const prev = instances[idx - 1];
  console.log('idx--', idx, 'prev bottom offset--', prev.vm.exposed!.bottomOffset.value)
  return prev.vm.exposed!.bottomOffset.value;
};
