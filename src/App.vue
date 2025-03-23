<script setup lang="ts">
import { ref } from 'vue';
import { Keyboard, KeyboardInput } from './packages';
// import { Keyboard, KeyboardInput } from '../dist/screen-keyboard.js';
// import '../dist/screen-keyboard.css';

function handleInput(key: string) {
  console.log('🚀 ~ handleInput ~ key:', key);
}
function handleChange(value: string) {
  console.log('🚀 ~ handleChange ~ value:', value);
}
function handleClose(key: keyof typeof panelShow.value) {
  console.log('🚀 ~ handleClose');
  panelShow.value[key] = false;
}
function handleOpen(key: keyof typeof panelShow.value) {
  console.log('🚀 ~ handleOpen');
  panelShow.value[key] = true;
}
function handleConfirm(value: string) {
  console.log('🚀 ~ handleConfirm ~ value:', value);
}
const panelShow = ref({
  panel1: false,
  panel2: false,
});
const inputValue = ref('');
const size = ref<'large' | 'middle' | 'small' | undefined>('middle');
</script>

<template>
  <div class="page">
    <div style="font-size: 24px; font-weight: bold">Keyboard 组件</div>
    <section class="-section">
      <div class="card">
        <span class="title">基础 keyboard 面板</span>
        <Keyboard @input="handleInput" position="rightTop" />
        <div style="color: #ff4d4f">注意看右上角</div>
      </div>
    </section>
    <div style="font-size: 24px; font-weight: bold">KeyboardInput 组件</div>
    <section class="section">
      <div class="card">
        <div class="title">基础 keyboardInput</div>
        <KeyboardInput
          v-model:value="inputValue"
          @change="handleChange"
          @close="handleClose('panel1')"
          @open="handleOpen('panel1')"
          @confirm="handleConfirm"
          isFocusShow
          allowToggle
          position="center"
          :canMove="true"
        />
        <div style="color: #ff4d4f" v-show="panelShow.panel1">
          <p>键盘显示了，注意屏幕中间</p>
          <p>点击输入框键盘图标可切换显示状态</p>
          <p>点击外部区域或键盘关闭按钮可关闭键盘</p>
        </div>
      </div>
      <div class="card">
        <div class="title">
          切换大小
          <span style="text-align: left; font-size: 16px; font-weight: normal"
            >当前大小：{{ size }}</span
          >
        </div>
        <div style="margin-bottom: 10px; gap: 10px; display: flex">
          <span
            style="
              border: 1px solid #666666;
              padding: 4px;
              border-radius: 3px;
              cursor: pointer;
            "
            @click="size = 'small'"
            >small</span
          >
          <span
            style="
              border: 1px solid #666666;
              padding: 4px;
              border-radius: 3px;
              cursor: pointer;
            "
            @click="size = 'middle'"
            >middle</span
          >
          <span
            style="
              border: 1px solid #666666;
              padding: 4px;
              border-radius: 3px;
              cursor: pointer;
            "
            @click="size = 'large'"
            >large</span
          >
        </div>
        <KeyboardInput
          v-model:value="inputValue"
          @change="handleChange"
          @close="handleClose('panel2')"
          @open="handleOpen('panel2')"
          @confirm="handleConfirm"
          isFocusShow
          allowToggle
          position="center"
          :canMove="true"
          :size="size"
          placeholder="点击切换按钮试一试"
        />
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  align-items: start;
  justify-content: flex-start;
  gap: 20px;
  height: 100%;
  width: 100%;
  /* height: 100vh; */
  background-color: #f0f0f0;
}
.section {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  align-items: start;
  justify-content: flex-start;
  gap: 20px;
}

.card {
  box-sizing: border-box;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
