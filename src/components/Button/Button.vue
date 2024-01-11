<template>
  <button
    class="dra-button"
    :class="{
      [`dra-button--${type}`]: type,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "./types";
defineOptions({
  name:'DragonButton'
})

withDefaults(defineProps<ButtonProps>(),{
  nativeType:'button'
})
</script>

<style scoped></style>
