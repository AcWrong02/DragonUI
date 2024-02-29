<template>
  <div
    class="dra-form-item"
    :class="{
      'is-error': validateStatus.state == 'error',
      'is-success': validateStatus.state == 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <lebel class="dra-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </lebel>
    <div class="dra-form-item__content">
      <slot :validate="validate"></slot>
      <div
        class="dra-form-item__error-msg"
        v-if="(validateStatus.state = 'error')"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNil } from "lodash-es";
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  ValidateStatusProp,
  FormItemInstance
} from "./types";
import { formContextKey, formItemContextKey } from "./types";
import {
  inject,
  computed,
  reactive,
  provide,
  onMounted,
  onUnmounted,
} from "vue";
import Schema from "async-validator";
defineOptions({
  name: "DraFormItem",
});

const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);

const validateStatus: ValidateStatusProp = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});

let initialValue: any = null;

const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required);
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

// 获取传入的trigger
const getTriggerRules = (trigger?: string) => {
  // console.log("getTriggerRules")
  const rules = itemRules.value;
  if (rules) {
    // console.log("getTriggerRules rules", rules)
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};

const validate = async (trigger?: string) => {
  const modelName = props.prop;

  //
  const triggerRules = getTriggerRules(trigger);
  // console.log("triggerRules: ", triggerRules)
  if (triggerRules.length === 0) return true;

  // console.log("modelName: ", modelName)

  if (modelName) {
    const validator = new Schema({
      [modelName]: triggerRules,
    });

    validateStatus.loading = true;

    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = "success";
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errorMsg =
          errors && errors.length > 0 ? errors[0].message || "" : "";
        return Promise.reject(e);
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};

const clearValidate = () => {
  validateStatus.state = "init";
  validateStatus.errorMsg = "";
  validateStatus.loading = false;
};

const resetField = () => {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
};

const context: FormItemContext = {
  prop: props.prop || "",
  validate,
  resetField,
  clearValidate,
};

provide(formItemContextKey, context);

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    initialValue = innerValue.value;
  }
});
onUnmounted(() => {
  formContext?.removeField(context);
});

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
})
</script>

<style scoped></style>
