<template>
  <form class="dra-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide } from "vue";
import type {
  FormContext,
  FormInstance,
  FormItemContext,
  FormProps,
  FormValidateFailure,
} from "./types";
import { formContextKey } from "./types";
import { filter } from "lodash-es";
defineOptions({
  name: "DraForm",
});

const props = defineProps<FormProps>();

const fields: FormItemContext[] = [];

const addField: FormContext["addField"] = (field) => {
  fields.push(field);
};

const removeField: FormContext["removeField"] = (field) => {
  if (fields.prop) fields.splice(fields.indexOf(field), 1);
};

const resetFields = (keys: string[] = []) => {
  const filterArr =
    keys.length > 0
      ? fields.filter((field) => keys.includes(field.prop))
      : fields;
  filterArr.forEach((field) => field.resetField());
};

const clearValidate = (keys: string[] = []) => {
  const filterArr =
    keys.length > 0
      ? fields.filter((field) => keys.includes(field.prop))
      : fields;
  filterArr.forEach((field) => field.clearValidate());
};

const validate = async () => {
  let validationErrors: any = {};
  console.log("field validation--", fields);
  for (const field of fields) {
    try {
      await field.validate("");
      console.log("field validated--", field);
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = { ...validationErrors, ...error.fields };
    }
  }
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};

provide(formContextKey, {
  ...props,
  addField,
  removeField,
});

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
});
</script>

<style scoped></style>
