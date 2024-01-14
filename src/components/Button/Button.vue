<template>
  <button
    class="dra-button"
    :class="{
      [`dra-button--${type}`]: type,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading':loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="!loading && icon"></Icon>
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "./types";
import Icon from '../Icon/Icon.vue'
defineOptions({
  name:'DragonButton'
})

withDefaults(defineProps<ButtonProps>(),{
  nativeType:'button'
})
</script>

<style scoped></style>
