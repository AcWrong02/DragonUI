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
        <input
          ref="input"
          :value="modelValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :disabled="disabled"
          class="dra-input__inner"
        />
        <span
          v-if="showPassword"
          class="dra-input__password"
          @click="handlePasswordVisible"
        >
          <Icon :icon="passwordVisible ? 'eye' : 'eye-slash'"></Icon>
        </span>
        <span v-if="$slots.suffix" class="dra-input__suffix">
          <slot name="suffix"></slot>
        </span>
        <span v-if="clearable" class="dra-input__clear" @click="handleClear">
          <Icon icon="xmark"></Icon>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="dra-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        ref="textarea"
        class="dra-textarea__wrapper"
        :disabled="disabled"
      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue";
import { computed, nextTick, ref, shallowRef } from "vue";
defineOptions({
  name: "DraInput",
});

type TargetElement = HTMLInputElement | HTMLTextAreaElement;

withDefaults(defineProps<InputProps>(), {
  type: "text",
});

const emit = defineEmits<InputEmits>();

//是否显示密码
const passwordVisible = ref(false);

const input = shallowRef<HTMLInputElement>();
const textarea = shallowRef<HTMLTextAreaElement>();
const _ref = computed(() => input.value || textarea.value);

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
  focus();
};

function handleInput(event: Event) {
  const value = (event.target as TargetElement).value;
  emit("input", value);
  emit("update:modelValue", value);
}

function handleClear() {
  emit("update:modelValue", "");
  emit("change", "");
  emit("clear");
  emit("input", "");
}

function handleFocus(event: FocusEvent) {
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  emit("blur", event);
}

function handleChange(event: Event) {
  emit("change", (event.target as TargetElement).value);
}

const focus = async () => {
  // see: https://github.com/ElemeFE/element/issues/18573
  await nextTick();
  _ref.value?.focus();
};

const blur = () => _ref.value?.blur()

defineExpose({
  /** @description HTML input element native method */
  focus,
  /** @description HTML input element native method */
  blur
});
</script>

<style scoped></style>
