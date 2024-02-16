<template>
  <div class="dra-form-item">
    <lebel class="dra-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </lebel>
    <div class="dra-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormItemProps } from './types';
defineOptions({
    name: 'DraFormItem',
})

const props = defineProps<FormItemProps>();
</script>

<style scoped></style>
