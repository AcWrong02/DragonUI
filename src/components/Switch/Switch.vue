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
      ref="input"
      class="dra-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="dra-switch__core">
      <div class="dra-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="dra-switch__core-inner-text"
          >{{ checked ? activeText : inactiveText }}</span
        >
      </div>
      <div class="dra-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { SwitchProps, SwitchEmits } from "./types";
defineOptions({
  name: "DraSwitch",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeValue: true,
  inactiveValue: false,
});

const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);

const input = ref<HTMLInputElement>();
//现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue);

const switchValue = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits("update:modelValue", newValue);
  emits("change", newValue);
};

onMounted(() => {
  input.value!.checked = checked.value;
});

watch(
  () => checked.value,
  (newValue) => {
    input.value!.checked = newValue;
  }
);

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
</script>

<style scoped></style>
