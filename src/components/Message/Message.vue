<template>
  <div
    class="dra-message"
    :class="{ [`dra-message--${type}`]: type, 'is-close': showClose }"
    role="alert"
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
import { ref } from "vue";
defineOptions({
    name:'DraMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: "info",
});

//消息显示与否
const visible = ref(false)
</script>

<style scoped></style>
