<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
// import {Keyboard} from './packages/Keyboard'
// import {KeyboardInput} from './packages/KeyboardInput';
import { KeyboardInput } from '../dist/screen-keyboard.js'
import  '../dist/screen-keyboard.css'

function handleInput(key: string) {
  console.log("🚀 ~ handleInput ~ key:", key)
}
const inputValue = ref('');
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <!-- <Keyboard @input="handleInput"/> -->
    <KeyboardInput
      v-model:value="inputValue"
      @change="handleInput"
      isFocusShow
      allowToggle
      position="center"
      :canMove="true"
    />
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
