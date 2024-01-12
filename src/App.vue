<template>
  <h1>按钮</h1>
  <div>
    <Button>Default Botton</Button>
    <Button type="primary">Primary Botton</Button>
    <Button type="info">Info Botton</Button>
    <Button type="danger">Danger Button</Button>
    <Button type="success">Success Button</Button>
    <Button type="warning">Warning Button</Button>
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
</template>

<script setup lang="ts">
import Button from "./components/Button/Button.vue";
</script>

<style>
div{
  margin: 10px;
}
</style>
