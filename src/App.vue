<template>
  <h1>按钮</h1>
  <div>
    <Button>Default Botton</Button>
    <Button type="primary">Primary Botton</Button>
    <Button type="info">Info Botton</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="success">Success Button</Button>
    <Button type="warning">Warning Button</Button>
    <Button type="warning" loading>Loading Button</Button>
    <Button type="warning" icon="arrow-up" loading>Icon Button</Button>
  </div>
  <div>
    <Button plain>Default Botton</Button>
    <Button type="primary" plain>Primary Botton</Button>
    <Button type="info" plain>Info Botton</Button>
    <Button type="danger" plain>Danger Button</Button>
    <Button type="success" plain>Success Button</Button>
    <Button type="warning" plain>Warning Button</Button>
  </div>
  <div>
    <Button plain round>Default Botton</Button>
    <Button type="primary" plain round>Primary Botton</Button>
    <Button type="info" plain round>Info Botton</Button>
    <Button type="danger" plain round>Danger Button</Button>
    <Button type="success" plain round>Success Button</Button>
    <Button type="warning" plain round>Warning Button</Button>
  </div>
  <div>
    <Button plain circle>B</Button>
    <Button type="primary" plain round circle>B</Button>
    <Button type="info" plain round circle>B</Button>
    <Button type="danger" plain round circle>B</Button>
    <Button type="success" plain round circle>B</Button>
    <Button type="warning" plain round circle>B</Button>
  </div>
  <div>
    <Button plain disabled>B</Button>
    <Button type="primary" plain disabled>B</Button>
    <Button type="info" plain disabled>B</Button>
    <Button type="danger" plain disabled>B</Button>
    <Button type="success" plain disabled>B</Button>
    <Button type="warning" plain disabled>B</Button>
  </div>
  <h1>Collapse折叠面板</h1>
  <div>
    <Collapse v-model="activeNames">
      <CollapseItem name="1">
        <template #title> title 1 </template>
        <div>content 1</div>
      </CollapseItem>
      <CollapseItem name="2">
        <template #title> title 2 </template>
        <template #default> content 2 </template>
      </CollapseItem>
      <CollapseItem name="3" disabled>
        <template #title> title 3 </template>
        <template #default> content 3 </template>
      </CollapseItem>
    </Collapse>
  </div>
  <Icon icon="arrow-up"></Icon>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
const activeNames = ref(["1"]);
</script>

<style></style>
