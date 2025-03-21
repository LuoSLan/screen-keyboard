# screen-keyboard

### Install & Use

```bash
pnpm i @lsl/screen-keyboard
# or
npm install @lsl/screen-keyboard
# or
yarn add @lsl/screen-keyboard
```

---

### How to use?

**Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ScreenKeyboard from '@lsl/screen-keyboard'

const app = createApp(App).mount('#app')
app.use(ScreenKeyboard)
```

**Local**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Keyboard, KeyboardInput } from '@lsl/screen-keyboard'

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

