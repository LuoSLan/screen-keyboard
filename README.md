<!--
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-21 23:25:50
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-22 00:13:16
 * @FilePath: \screen-keyboard\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# screen-keyboard

### Install & Use

```bash
pnpm i @lslan/screen-keyboard
# or
npm install @lslan/screen-keyboard
# or
yarn add @lslan/screen-keyboard
```

---

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

### Components

| Component name | Descriptions                                                 |
| -------------- | ------------------------------------------------------------ |
| Keyboard       | Provide a numeric and alphabetic keyboard, and its position can be dragged |
| KeyboardInput  | An input component with the virtual keyboard                 |

