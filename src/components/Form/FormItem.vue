<template>
  <div class="dra-form-item">
    <lebel class="dra-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </lebel>
    <div class="dra-form-item__content">
      <slot></slot>
    </div>
  </div>
  {{ innerValue }} - {{  itemRules }}
</template>

<script setup lang="ts">
import { isNil } from "lodash-es";
import type { FormItemProps } from "./types";
import { formContextKey } from "./types";
import { inject, computed } from "vue";
defineOptions({
  name: "DraFormItem",
});

const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);

const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  }else{
    return null;
  }
});

const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && !isNil(rules[props.prop])) {
    return rules[props.prop];
  } else {
    return [];
  }
})
</script>

<style scoped></style>
