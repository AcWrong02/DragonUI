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
  <h1>Collapse折叠面板——</h1>
  <div>
    <Collapse v-model="activeNames1" @change="change">
      <CollapseItem name="1">
        <template #title> title 1 </template>
        <div>content 1</div>
      </CollapseItem>
      <CollapseItem name="2">
        <template #title> title 2 </template>
        <template #default> content 2 </template>
      </CollapseItem>
      <CollapseItem name="3">
        <template #title> title 3 </template>
        <template #default> content 3 </template>
      </CollapseItem>
    </Collapse>
    <button @click="click">click</button>
  </div>
  <button @click="handleClick">click</button>
  <h1>ToolTip</h1>
  <ToolTip>
    <Button>Hover</Button>

    <template #content>
      <div>This is Content</div>
    </template>
  </ToolTip>
  <h1>下拉菜单</h1>
  <DropDown>
    <template #dropdown>
      <DropDownItem label="老友粉"></DropDownItem>
      <DropDownItem label="黄金糕"></DropDownItem>
      <DropDownItem label="狮子头"></DropDownItem>
    </template>
  </DropDown>
  <Input v-model="inputValue" type="text" clearable />
  <div>{{ inputValue }}</div>
  <h1>showPassword</h1>
  <Input v-model="inputValue" type="text" show-password />
  <h1>Switch组件</h1>
  <!-- <Switch v-model="switchValue"></Switch> -->
  <Switch v-model="switchValue" active-value="right" inactive-value="wrong"></Switch>
  <div>{{ switchValue }}</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import DropDown from "./components/DropDown/DropDown.vue";
import DropDownItem from "./components/DropDown/DropdownItem.vue";
import ToolTip from "./components/Tooltip/Tooltip.vue";
import Input from "./components/Input/Input.vue";
import Switch from "./components/Switch/Switch.vue";
import { createMessage } from "./components/Message/methods";
onMounted(() => {
  const instance = createMessage({ message: "hello world!", duration: 0 });
  createMessage({
    message: "hello world again!",
    duration: 0,
    type: "warning",
    showClose: true,
  });
  createMessage({
    message: "hello world three!",
    duration: 0,
    type: "danger",
    showClose: true,
  });
  setTimeout(() => {
    instance.destroy();
  }, 2000);
});

const activeNames = ref(["1"]);
const activeNames1 = ref(["1"]);
const click = () => {
  activeNames1.value.push("2");
};
const change = (value) => {
  console.log("change---", value);
};

const handleClick = () => {
  activeNames1.value = ["1", "2"];
};

const value = ref(["1"]);
watch(
  () => value.value,
  (value, oldValue) => {
    console.log(value === oldValue);
  },
  { deep: true }
);

const inputValue = ref("value");

const switchValue = ref("right");
</script>

<style></style>
