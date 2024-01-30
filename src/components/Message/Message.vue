<template>
  <div
    class="dra-message"
    :class="{ [`dra-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
    v-if="visible"
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
import Icon from '../Icon/Icon.vue'
import { onMounted, ref } from "vue";
defineOptions({
    name:'DraMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: "info",
});

const startTime = ()=>{
  if(props.duration === 0) return
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

//消息显示与否
const visible = ref(false)

onMounted(() => {
  visible.value = true;
  console.log("mounted")
  startTime();
})
</script>

<style scoped></style>
