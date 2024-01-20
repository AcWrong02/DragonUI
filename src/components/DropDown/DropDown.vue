<template>
  <div class="dra-dropdown" style="display: inline-flex;">
    <ToolTip :placement="placement">
      <template #content>
        <slot></slot>  
      </template>
      <button>哈哈哈</button>
    </ToolTip>
  </div>
</template>

<script setup lang="ts">
import ToolTip from "../Tooltip/ToolTip.vue";
import type { dropDownProps } from "./types";

const props = withDefaults(defineProps<dropDownProps>(), {
    splitButton:false,
    placement: "bottom",
    trigger: "hover",
    disabled: false
});
</script>

<style scoped></style>
