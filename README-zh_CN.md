# screen-keyboard

```markdown
[![Downloads](https://img.shields.io/npm/dm/@lslan/screen-keyboard.svg)](https://www.npmjs.com/package/@lslan/screen-keyboard) [![Version](https://img.shields.io/npm/v/@lslan/screen-keyboard.svg)](https://www.npmjs.com/package/@lslan/screen-keyboard)
```
简体中文| [English](./README.md)

## 开始使用

### 安装

```bash
pnpm i @lslan/screen-keyboard
# or
npm install @lslan/screen-keyboard
# or
yarn add @lslan/screen-keyboard
```


### 如何使用?

**全局**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ScreenKeyboard from '@lslan/screen-keyboard'
import '@lslan/screen-keyboard/dist/screen-keyboard.css'

const app = createApp(App).mount('#app')
app.use(ScreenKeyboard)
```

**局部**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Keyboard, KeyboardInput } from '@lslan/screen-keyboard'
import '@lslan/screen-keyboard/dist/screen-keyboard.css'

const inputValue = ref('')

function handleInput(key: string) {
  console.log("key:", key)
}

</script>

<template>
  <div>
    <Keyboard @input="handleInput" />
    <KeyboardInput v-model:value="inputValue" />
  </div>
</template>
```

## 组件

| 组件名称      | 说明                               |
| ------------- | ---------------------------------- |
| Keyboard      | 提供数字和字母键盘，可拖拽移动位置 |
| KeyboardInput | 带有虚拟键盘的输入框组件           |


> **Keyboard**

| 参数        | 说明                             | 类型                                                         | 默认值     |
| ----------- | -------------------------------- | ------------------------------------------------------------ | ---------- |
| defaultType | 默认键盘类型                     | number \| text                                               | number     |
| position    | 键盘面板在屏幕上的初始位置       | center \| topCenter \| bottomCenter \| leftTop \| leftBottom \| rightTop \| rightBottom \| [number,number] | leftBottom |
| allowToggle | 是否允许切换键盘类型             | boolean                                                      | false      |
| canMove     | 是否允许移动键盘面板             | boolean                                                      | true       |
| onClose     | 关闭按钮的回调                   | () => void                                                   | -          |
| onInput     | 点击虚拟键盘输入数字或字母的回调 | (key:string, isDelete:boolean, isDeleteAll:boolean) => void  | -          |
| onConfirm   | 点击确认按钮的回调               | () => void                                                   | -          |
| onDelete    | 点击退格按钮的回调               | () => void                                                   | -          |
| onDeleteAll | 点击清空按钮的回调               | () => void                                                   | -          |

> **KeyboardInput**

| 参数           | 说明                                 | 类型                                                         | 默认值     |
| -------------- | ------------------------------------ | ------------------------------------------------------------ | ---------- |
| value(v-model) | 输入框内容                           | string                                                       | -          |
| show           | 键盘面板是否显示状态                 | boolean                                                      | false      |
| size           | 输入框大小                           | small \| middle \| large                                     | middle     |
| isFocusShow    | 是否开启输入框聚焦时自动打开键盘面板 | boolean                                                      | false      |
| disabled       | 输入框是否禁用状态                   | boolean                                                      | false      |
| defaultType    | 默认键盘类型                         | number \| text                                               | number     |
| position       | 键盘面板在屏幕上的初始位置           | center \| leftTop \| leftBottom \| rightTop \| rightBottom \| [number,number] | leftBottom |
| allowToggle    | 是否允许切换键盘类型                 | boolean                                                      | false      |
| canMove        | 是否允许移动键盘面板                 | boolean                                                      | true       |
| onInput        | 输入键的回调                         | (key:string, isDelete:boolean, isDeleteAll:boolean) => void  | -          |
| onChange       | 输入框内容变化时的回调               | (value:string) => void                                       | -          |
| onConfirm      | 点击确认按钮的回调                   | (value:string) => void                                       | -          |
| onClose        | 键盘隐藏时的回调                     | () => void                                                   | -          |
| onOpen         | 键盘显示时的回调                     | () => void                                                   | -          |

