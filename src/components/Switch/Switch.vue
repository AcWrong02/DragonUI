<template>
  <div
    class="dra-switch"
    :class="{
      [`dra-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="dra-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
    />
    <div class="dra-switch__core">
      <div class="dra-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { SwitchProps, SwitchEmits } from "./types";
defineOptions({
  name: "DraSwitch",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
});

const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value);
const switchValue = () => {
  if (props.disabled) return;
  innerValue.value = !checked.value;
  emits("update:modelValue", innerValue.value);
  emits("change", innerValue.value);
};
</script>

<style scoped></style>
