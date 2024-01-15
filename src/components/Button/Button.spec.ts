import {mount} from '@vue/test-utils'
import { describe, test,expect } from "vitest";
import Button from './Button.vue';

describe("Button", () => {
    test('button type', async ()=>{
        const wrapper = mount(Button,{
            props:{
                type:'primary'
            }
        })
        expect(wrapper.find('.dra-button--primary').exists()).toBe(true)
    })
});
