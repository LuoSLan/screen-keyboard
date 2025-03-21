<!--
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-19 23:19:13
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-21 21:46:17
 * @FilePath: \screen-keyboard\src\packages\KeyboardInput\KeyboardInput.vue
 * @Description: 虚拟键盘输入框
-->
<script setup lang="ts">
import { ref, unref, watch, computed } from 'vue';
import { useAttrs, useValue } from '../../Keyboard';
import { Keyboard, useKeyboardInput } from '../../Keyboard';
import { onClickOutside } from '@vueuse/core';

defineOptions({ name: 'KeyboardInput', inheritAttrs: false });

const emit = defineEmits(['change', 'submit', 'update:value', 'input']);
const attrs = useAttrs({ excludeDefaultKeys: false });
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  isFocusShow: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  keyboardShowFromProps: {
    type: Boolean,
    default: false,
  },
});

const { insertTxtAndSetCursor, keyboardInputRef } = useKeyboardInput<
  ['update:value', 'input']
>({
  emitFn: emit,
  changeEventName: 'update:value',
  inputEventName: 'input',
});
const keyboardShow = ref(false);
const keyboardInputWrapperRef = ref<HTMLElement | null>(null);
onClickOutside(keyboardInputWrapperRef, handleKeyboardBlur);

const emitData = ref<string[]>(['']);
const [state] = useValue(props, 'value', 'change', emitData);

function handleInput(e: Event) {
  emit('update:value', state.value);
}

function handleSubmit() {
  emit('submit', state.value);
}

const handleKeyboardValue = (
  ...args: Parameters<typeof insertTxtAndSetCursor>
) => {
  const value = insertTxtAndSetCursor(...args);
  value && (state.value = value);
  emit('change', state.value);
};

function changeKeyboardShow(visible: boolean) {
  keyboardShow.value = visible;
}

function handleKeyboardBlur() {
  keyboardShow.value && (keyboardShow.value = false);
}

defineExpose({ changeKeyboardShow });

if (props.keyboardShowFromProps) {
  keyboardShow.value = true;
}
watch(
  () => props.keyboardShowFromProps,
  (v) => {
    keyboardShow.value = v;
  }
);

const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>

<template>
  <div ref="keyboardInputWrapperRef">
    <div>
      <span class="lsl-keyboard-input-wrapper">
        <input
          v-bind="getBindValue"
          type="text"
          class="lsl-keyboard-input"
          v-model="state"
          @focus="isFocusShow && (keyboardShow = true)"
          @keydown.enter="handleSubmit"
          ref="keyboardInputRef"
          @input="handleInput"
        />
        <span v-show="!getBindValue.disabled && keyboardShow">
          <img @click="keyboardShow = !keyboardShow" class="svgIcon" src="../../../assets/keyboard_filled.svg" alt="keyboard" />
        </span>
        <span v-show="!getBindValue.disabled && !keyboardShow">
          <img @click="keyboardShow = !keyboardShow" class="svgIcon" src="../../../assets/keyboard_regular.svg" alt="keyboard" />

        </span>
      </span>
    </div>
    <Keyboard
      v-show="keyboardShow"
      @close="keyboardShow = false"
      @input="handleKeyboardValue"
      @confirm="handleSubmit"
      v-bind="$attrs"
    />
  </div>
</template>

<style lang="less" scoped>
.lsl-keyboard-input-wrapper {
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 4px 11px;
  font-size: 14px;
  // color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714;
  background-color: #fff;
  background-image: none;
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  transition: all 0.2s;

  .svgIcon {
    width: 45px;
    height: 45px;
  }
}

.lsl-keyboard-input {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 0;
  margin: 0;
  // font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: inherit;
  line-height: 1.5714;
  color: rgb(0 0 0 / 88%);
  list-style: none;
  background-color: #fff;
  background-image: none;
  border: none;
  border-radius: 0;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    font-size: 16px;
    color: #00000040;
  }
}
</style>
