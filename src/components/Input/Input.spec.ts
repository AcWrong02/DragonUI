import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input", () => {
  test("create", async () => {
    const wrapper = mount(Input, {
      props: {
        type: "text",
        size: "small",
        modelValue: "",
      },
      slots: {
        prepend: "prepend",
        append: "append",
        prefix: "prefix",
        suffix: "suffix",
      },
    });
    expect(wrapper.find(".dra-input--small").exists()).toBeTruthy();
    // should render input
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.get("input").attributes("type")).toBe("text");
    // slots
    expect(wrapper.find(".dra-input__prepend").exists()).toBeTruthy();
    expect(wrapper.find(".dra-input__prefix").exists()).toBeTruthy();
    expect(wrapper.find(".dra-input__suffix").exists()).toBeTruthy();
    expect(wrapper.find(".dra-input__append").exists()).toBeTruthy();

    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: "textarea",
        modelValue: "",
      },
    });
    expect(wrapper2.find("textarea").exists()).toBeTruthy();
  });

  test("modelValue", async () => {
    const wrapper = mount(Input, {
      props: {
        type: "text",
        modelValue: "value",
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      },
    });

    const input = wrapper.get('input')

    expect(wrapper.get("input").element.value).toBe("value");

    // input value change
    await wrapper.get("input").setValue("update value");
    expect(wrapper.props('modelValue')).toBe("update value")
    expect(wrapper.get("input").element.value).toBe("update value");

    // props change
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(input.element.value).toBe('prop update')
  });
});
