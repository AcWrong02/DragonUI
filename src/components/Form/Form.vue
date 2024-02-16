<template>
    <form class="dra-form">
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import type { FormItemProps } from "./types"
defineOptions({
    name:'DraForm'
})

const props = defineProps<FormItemProps>()
</script>

<style scoped></style>
