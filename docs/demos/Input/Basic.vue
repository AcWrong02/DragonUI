<script setup>
import Input from "../../../src/components/Input/Input.vue";
import { ref } from "vue";
const input = ref("");
</script>

<template>
  <Input v-model="input" placeholder="Please input" />
</template>
