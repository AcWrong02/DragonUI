<template>
  <div
    class="dra-form-item"
    :class="{
      'is-error': validateStatus.state == 'error',
      'is-success': validateStatus.state == 'success',
      'is-loading': validateStatus.loading,
    }"
  >
    <lebel class="dra-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </lebel>
    <div class="dra-form-item__content">
      <slot></slot>
      <div
        class="dra-form-item__error-msg"
        v-if="(validateStatus.state = 'error')"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
  {{ innerValue }} - {{ itemRules }}
  <button @click.prevent="validate">Validate</button>
</template>

<script setup lang="ts">
import { isNil } from "lodash-es";
import type { FormItemProps, FormValidateFailure } from "./types";
import { formContextKey } from "./types";
import { inject, computed, reactive } from "vue";
import Schema from "async-validator";
defineOptions({
  name: "DraFormItem",
});

const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);

const validateStatus = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});

const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
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
});

const validate = () => {
  const modelName = props.prop;
  if (modelName) {
    const validator = new Schema({
      [modelName]: itemRules.value,
    });

    validateStatus.loading = true;

    validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = "success";
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errorMsg =
          errors && errors.length > 0 ? errors[0].message || "" : "";
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};
</script>

<style scoped></style>
