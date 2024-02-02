<template>
  <div
    class="dra-message"
    :class="{ [`dra-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
    v-show="visible"
    ref="messageRef"
    :style="cssStyle"
  >
    <div class="dra-message__content">
      <sloe>{{ message }}</sloe>
    </div>
    <div class="dra-message__close" v-if="showClose">
      <Icon icon="xmark"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./types";
import Icon from "../Icon/Icon.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { getLastBottomOffset } from "./methods";
defineOptions({
  name: "DraMessage",
});
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: "info",
  offset: 20,
});

const startTime = () => {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

//消息显示与否
const visible = ref(false);

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
}));

watch(visible, (newValue) => {
  if (!newValue) props.onDestroy();
});

onMounted(async () => {
  visible.value = true;
  startTime();
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height;
});

defineExpose({
  bottomOffset,
});
</script>

<style scoped>
.dra-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid #ccc;
}
</style>
