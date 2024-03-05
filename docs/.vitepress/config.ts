import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DragonUI",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components/button' }
    ],

    sidebar: [
      {
        text: 'Basic基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
        ]
      },
      {
        text: 'Form表单组件',
        items: [
          { text: 'Input 输入框', link: '/components/input' },
        ]
      },
      {
        text: 'Feedback反馈组件',
        items:[
          { text: 'Message 消息提示', link: '/components/message' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }
})
