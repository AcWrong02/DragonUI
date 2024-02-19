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
})
</script>

<style scoped></style>
