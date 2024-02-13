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
      'is-focus': isFocus,
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
          v-model="innerValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :placeholder="placeholder"
          :readonly="readonly"
          :tabindex="tabindex"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          class="dra-input__inner"
        />
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="dra-input__suffix"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            class="dra-input__clear"
            v-if="showClear"
            @click="handleClear"
          ></Icon>
          <Icon
            v-if="showPasswordArea"
            class="dra-input__password"
            @click="handlePasswordVisible"
            :icon="passwordVisible ? 'eye' : 'eye-slash'"
          ></Icon>
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
        :placeholder="placeholder"
        :readonly="readonly"
        :tabindex="tabindex"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue";
import { computed, nextTick, ref, shallowRef, watch } from "vue";
defineOptions({
  name: "DraInput",
});

type TargetElement = HTMLInputElement | HTMLTextAreaElement;

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});

const emit = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue);

// 是否是聚焦状态
const isFocus = ref(false);

const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);

const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);

//是否显示密码
const passwordVisible = ref(false);

const input = shallowRef<HTMLInputElement>();
const textarea = shallowRef<HTMLTextAreaElement>();
const _ref = computed(() => input.value || textarea.value);

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
  focus();
};

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

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
  isFocus.value = true;
  emit("focus", event);
}

function handleBlur(event: FocusEvent) {
  isFocus.value = false;
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

const blur = () => _ref.value?.blur();

defineExpose({
  /** @description HTML input element native method */
  focus,
  /** @description HTML input element native method */
  blur,
});
</script>

<style scoped></style>
