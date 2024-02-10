<template>
  <div
    class="dra-input"
    :class="{
      [`dra-input--${type}`]: type,
      [`dra-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="dra-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="dra-input__wrapper">
        <span v-if="$slots.prefix" class="dra-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input :type="type" :disabled="disabled" class="dra-input__inner" />
      </div>
    </template>
    <template v-else>
      <textarea class="dra-textarea__wrapper" :disabled="disabled"> </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InputProps } from "./types";
defineOptions({
  name: "DraInput",
});

withDefaults(defineProps<InputProps>(), {
  type: "text",
});
</script>

<style scoped></style>
