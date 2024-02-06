<template>
  <div
    class="dra-message"
    :class="{ [`dra-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
    v-show="visiable"
    ref="messageRef"
    :style="cssStyle"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="dra-message__content">
      <slot
        >{{ offset }}-{{ topOffset }}-{{ height }} - {{ bottomOffset }} -
        {{ message }}</slot
      >
    </div>
    <div class="dra-message__close" v-if="showClose" @click="onDestroy">
      <Icon icon="xmark"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./types";
import Icon from "../Icon/Icon.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./methods";
import useEventListener from "@/hooks/useEventListener";
defineOptions({
  name: "DraMessage",
});
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: "info",
  offset: 20,
});

let timer: any;
const startTimer = () => {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visiable.value = false;
  }, props.duration);
};

const clearTimer = () => {
  clearTimeout(timer);
};

//消息显示与否
const visiable = ref(false);

const messageRef = ref<HTMLElement>();
// 计算偏移高度
const height = ref(0);
// 上一个实例的最下面的坐标数值，第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id));
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value);
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的值
const bottomOffset = computed(() => height.value + topOffset.value);
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));

watch(visiable, (newValue) => {
  if (!newValue) props.onDestroy();
});

onMounted(async () => {
  visiable.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height;
});

// 添加事件
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visiable.value = false;
  }
}
useEventListener(document, "keydown", keydown);

defineExpose({
  bottomOffset,
  visiable,
  
});
</script>
