# screen-keyboard

```markdown
[![Downloads](https://img.shields.io/npm/dm/@lslan/screen-keyboard.svg)](https://www.npmjs.com/package/@lslan/screen-keyboard) [![Version](https://img.shields.io/npm/v/@lslan/screen-keyboard.svg)](https://www.npmjs.com/package/@lslan/screen-keyboard)
```
English | [简体中文](./README-zh_CN.md)

## Getting started

### Install

```bash
pnpm i @lslan/screen-keyboard
# or
npm install @lslan/screen-keyboard
# or
yarn add @lslan/screen-keyboard
```


### How to use?

**Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ScreenKeyboard from '@lslan/screen-keyboard'
import '@lslan/screen-keyboard/dist/screen-keyboard.css'

const app = createApp(App).mount('#app')
app.use(ScreenKeyboard)
```

**Local**

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

## Components

| Component name | Descriptions                                                 |
| -------------- | ------------------------------------------------------------ |
| Keyboard       | Provides a numeric and alphabetic keyboard, and its position can be dragged |
| KeyboardInput  | An input component with the virtual keyboard                 |


> **Keyboard**

| Property    | Description                                                  | Type                                                         | Default    |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| defaultType | The default keyboard type                                    | number \| text                                               | number     |
| position    | The initial position of the keyboard panel on the screen when it is displayed | center \|topCenter \| bottomCenter \| leftTop \| leftBottom \| rightTop \| rightBottom \| [number,number] | leftBottom |
| allowToggle | Allow keyboard type switching                                | boolean                                                      | false      |
| canMove     | Can keyboard panel be moved by dragging                      | boolean                                                      | true       |
| onClose     | Callback when click the Close button                         | () => void                                                   | -          |
| onInput     | Callback when input                                          | (key:string, isDelete:boolean, isDeleteAll:boolean) => void  | -          |
| onConfirm   | Callback when click the Confirm button                       | () => void                                                   | -          |
| onDelete    | Callback when click the Backspace button                     | () => void                                                   | -          |
| onDeleteAll | Callback when click the Clear button                         | () => void                                                   | -          |

> **KeyboardInput**

| Property       | Description                                                  | Type                                                         | Default    |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------- |
| value(v-model) | The input content value                                      | string                                                       | -          |
| show           | Whether to show the keyboard panel                           | boolean                                                      | false      |
| size           | The size of the input box                                    | small \| middle \| large                                     | middle     |
| isFocusShow    | Auto show the keyboard panel when focus                      | boolean                                                      | false      |
| disabled       | Whether the input is disabled                                | boolean                                                      | false      |
| defaultType    | The default keyboard type                                    | number \| text                                               | number     |
| position       | The initial position of the keyboard panel on the screen when it is displayed | center \| leftTop \| leftBottom \| rightTop \| rightBottom \| [number,number] | leftBottom |
| allowToggle    | Allow keyboard type switching                                | boolean                                                      | false      |
| canMove        | Can the keyboard panel be moved by dragging                  | boolean                                                      | true       |
| onInput        | Callback when input                                          | (key:string, isDelete:boolean, isDeleteAll:boolean) => void  | -          |
| onChange       | Callback when value change                                   | (value:string) => void                                       | -          |
| onConfirm      | Callback when click the Confirm button                       | (value:string) => void                                       | -          |
| onClose        | Callback when keyboard panel display                         | () => void                                                   | -          |
| onOpen         | Callback when keyboard panel show                            | () => void                                                   | -          |

