<template>
  <form class="dra-form">
    <slot></slot>
    <button @click.prevent="validate">validate</button>
  </form>
</template>

<script setup lang="ts">
import { provide } from "vue";
import type { FormContext, FormItemContext, FormProps } from "./types";
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

const validate = ()=>{
  console.log("field validation--",fields);
}

provide(formContextKey, {
  ...props,
  addField,
  removeField,
});
</script>

<style scoped></style>
