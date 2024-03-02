import type { App } from "vue";
import Button from "./components/Button";
import Collapse, { CollapseItem } from "./components/Collapse";
import Message, { createMessage } from "./components/Message";

const components = [Button, Collapse, CollapseItem, Message];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { install, Button, Collapse, CollapseItem, Message, createMessage };

export default {
  install,
};
