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
      <slot :validate="validate"></slot>
      <div
        class="dra-form-item__error-msg"
        v-if="(validateStatus.state = 'error')"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
  {{ innerValue }} - {{ itemRules }}
</template>

<script setup lang="ts">
import { isNil } from "lodash-es";
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
} from "./types";
import { formContextKey, formItemContextKey } from "./types";
import { inject, computed, reactive, provide } from "vue";
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

// 获取传入的trigger
const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filters((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};

const validate = (trigger?: string) => {
  const modelName = props.prop;

  // 
  const triggerRules = getTriggerRules(trigger);
  if(triggerRules.length === 0) return true;

  if (modelName) {
    const validator = new Schema({
      [modelName]: triggerRules,
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

const context: FormItemContext = {
  validate,
};
provide(formItemContextKey, context);
</script>

<style scoped></style>
