import { mount } from "@vue/test-utils";
import { describe, test, expect, vi } from "vitest";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import { nextTick, ref } from "vue";

describe("Collapse", () => {
  test("create", async () => {
    const activeNames = ref(["1"]);
    const wrapper = mount(() => (
      <Collapse modelValue={activeNames.value}>
        <CollapseItem title="title1" name="1">
          <div class="content">111</div>
        </CollapseItem>
        <CollapseItem title="title2" name="2">
          <div class="content">222</div>
        </CollapseItem>
        <CollapseItem title="title3" name="3">
          <div class="content">333</div>
        </CollapseItem>
        <CollapseItem title="title4" name="4">
          <div class="content">444</div>
        </CollapseItem>
      </Collapse>
    ));
    const vm = wrapper.vm;
    const collapseWrapper = wrapper.findComponent(Collapse);
    const collapseItemWrappers =
      collapseWrapper.findAllComponents(CollapseItem);
    const collapseItemHeaderEls = vm.$el.querySelectorAll(
      ".dra-collapse-item__header"
    );
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);

    collapseItemHeaderEls[2].click();
    await nextTick();
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);
    expect(collapseItemWrappers[2].vm.isActive).toBe(true);
    collapseItemHeaderEls[0].click();
    await nextTick();
    expect(collapseItemWrappers[0].vm.isActive).toBe(false);
  });

  test("accordion", async () => {
    const activeNames = ref(["1"]);

    const wrapper = mount(() => (
      <Collapse modelValue={activeNames.value} accordion>
        <CollapseItem title="title1" name="1">
          <div class="content">111</div>
        </CollapseItem>
        <CollapseItem title="title2" name="2">
          <div class="content">222</div>
        </CollapseItem>
        <CollapseItem title="title3" name="3">
          <div class="content">333</div>
        </CollapseItem>
        <CollapseItem title="title4" name="4">
          <div class="content">444</div>
        </CollapseItem>
      </Collapse>
    ));

    const vm = wrapper.vm;
    const collapseWrapper = wrapper.findComponent(Collapse);
    const collapseItemWrappers =
      collapseWrapper.findAllComponents(CollapseItem);
    const collapseItemHeaderEls = vm.$el.querySelectorAll(
      ".dra-collapse-item__header"
    );
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);

    collapseItemHeaderEls[2].click();
    await nextTick();
    expect(collapseItemWrappers[0].vm.isActive).toBe(false);
    expect(collapseItemWrappers[2].vm.isActive).toBe(true);
    collapseItemHeaderEls[0].click();
    await nextTick();
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);
    expect(collapseItemWrappers[2].vm.isActive).toBe(false);
  });

  test("event:change", async () => {
    const activeNames = ref(["1"]);
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <Collapse modelValue={activeNames.value} onChange={onChange}>
        <CollapseItem title="title1" name="1">
          <div class="content">111</div>
        </CollapseItem>
        <CollapseItem title="title2" name="2">
          <div class="content">222</div>
        </CollapseItem>
        <CollapseItem title="title3" name="3">
          <div class="content">333</div>
        </CollapseItem>
        <CollapseItem title="title4" name="4">
          <div class="content">444</div>
        </CollapseItem>
      </Collapse>
    ));

    const collapseWrapper = wrapper.findComponent(Collapse);
    const vm = collapseWrapper.vm;
    const collapseItemWrappers =
      collapseWrapper.findAllComponents(CollapseItem);
    const collapseItemHeaderEls = vm.$el.querySelectorAll(
      ".dra-collapse-item__header"
    );
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);
    expect(vm.activeNames).toEqual(["1"]);
    expect(onChange).not.toHaveBeenCalled();
    
    collapseItemHeaderEls[2].click();
    await nextTick();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);
    expect(collapseItemWrappers[2].vm.isActive).toBe(true);
    expect(vm.activeNames).toEqual(["1", "3"]);
    console.log('vm.activeNames---',activeNames.value, vm.activeNames)

    activeNames.value.push("4");
    await nextTick();
    console.log('vm.activeNames---', activeNames.value,vm.activeNames)
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(vm.activeNames).toEqual(["1", "3", "4"]);
    
    collapseItemHeaderEls[0].click();
    await nextTick();
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(collapseItemWrappers[0].vm.isActive).toBe(false);
    expect(vm.activeNames).toEqual(["3", "4"]);

    activeNames.value = ["1", "3"];
    await nextTick();
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  test("watch deep modelValue", async () => {
    const activeNames = ref(["1"]);
    const wrapper = mount(() => (
      <Collapse modelValue={activeNames.value}>
        <CollapseItem title="title1" name="1">
          <div class="content">111</div>
        </CollapseItem>
        <CollapseItem title="title2" name="2">
          <div class="content">222</div>
        </CollapseItem>
        <CollapseItem title="title3" name="3">
          <div class="content">333</div>
        </CollapseItem>
        <CollapseItem title="title4" name="4">
          <div class="content">444</div>
        </CollapseItem>
      </Collapse>
    ));
    activeNames.value.push("2");
    await nextTick();
    const collapseWrapper = wrapper.findComponent(Collapse);
    const collapseItemWrappers =
      collapseWrapper.findAllComponents(CollapseItem);
    expect(collapseItemWrappers[0].vm.isActive).toBe(true);
    expect(collapseItemWrappers[1].vm.isActive).toBe(true);
  });
});
