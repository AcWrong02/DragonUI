<template>
    <div class="dra-dropdown-item">
        <div class="dropdown-item__content">
            <span class="dropdown-item__label">{{ label }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { dropDownItemProps } from './types';

const props = defineProps<dropDownItemProps>()

</script>

<style scoped></style>
