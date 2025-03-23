<!--
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-19 23:19:13
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-23 23:52:18
 * @FilePath: \screen-keyboard\src\packages\KeyboardInput\KeyboardInput.vue
 * @Description: 虚拟键盘输入框
-->
<script setup lang="ts">
import { ref, unref, watch, computed, type PropType } from 'vue';
import { useAttrs, useValue } from '../../Keyboard';
import { Keyboard, useKeyboardInput } from '../../Keyboard';
import { onClickOutside } from '@vueuse/core';
import { omit } from 'lodash-es';

defineOptions({ name: 'KeyboardInput', inheritAttrs: false });

const emit = defineEmits([
  'change',
  'submit',
  'confirm',
  'update:value',
  'input',
  'close',
  'open',
]);
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
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'large' | 'middle' | 'small'>,
    default: 'middle',
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
  const inputEvent = e as InputEvent;
  const target = e.target as HTMLInputElement;
  const value = target.value;
  const key = inputEvent.data || target.value;
  state.value = value;
  emit('input', key);
  emit('update:value', state.value);
}

function handleSubmit() {
  emit('submit', state.value);
  emit('confirm', state.value);
}

function handleFocus() {
  props.isFocusShow && (keyboardShow.value = true);
}

const handleKeyboardValue = (
  ...args: Parameters<typeof insertTxtAndSetCursor>
) => {
  const value = insertTxtAndSetCursor(...args);
  value && (state.value = value);
};

function changeKeyboardShow(visible: boolean) {
  keyboardShow.value = visible;
}

function handleKeyboardBlur() {
  keyboardShow.value && (keyboardShow.value = false);
}

defineExpose({ changeKeyboardShow });

// if (props.show) {
//   keyboardShow.value = true;
// }
watch(
  () => props.show,
  (v) => {
    keyboardShow.value = v;
  },
  { immediate: true }
);

watch(
  () => keyboardShow.value,
  (v) => {
    if (v) {
      emit('open');
    } else {
      emit('close');
    }
  }
);

const getBindValue = computed(() => {
  const bindValue = { ...unref(attrs), ...props };

  return omit(bindValue, ['size']);
});

const sizeClass = (name: string) => {
  return `${name}-${props.size}`;
};
</script>

<template>
  <div ref="keyboardInputWrapperRef">
    <div>
      <span
        class="lsl-keyboard-input-wrapper"
        :class="sizeClass('lsl-keyboard-input-wrapper')"
      >
        <input
          v-bind="getBindValue"
          type="text"
          class="lsl-keyboard-input"
          @focus="handleFocus"
          @keydown.enter="handleSubmit"
          ref="keyboardInputRef"
          @input="handleInput"
        />
        <span v-show="!getBindValue.disabled && keyboardShow">
          <img
            @click="keyboardShow = !keyboardShow"
            :class="sizeClass('svgIcon')"
            src="../../../assets/keyboard_filled.svg"
            alt="keyboard"
          />
        </span>
        <span v-show="!getBindValue.disabled && !keyboardShow">
          <img
            @click="keyboardShow = !keyboardShow"
            :class="sizeClass('svgIcon')"
            src="../../../assets/keyboard_regular.svg"
            alt="keyboard"
          />
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
// @large: 45px;
// @middle: 32px;
// @small: 24px;

.lsl-keyboard-input-wrapper {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 0;
  // height: calc(45px + 8px + 2px);
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
}

// .lsl-keyboard-input-wrapper {

// }

.lsl-keyboard-input-wrapper-large {
  height: calc(45px + 8px + 2px);
  // height: calc(@large + 8px + 2px);
}
.lsl-keyboard-input-wrapper-middle {
  height: calc(32px + 8px + 2px);
  // height: calc(@middle + 8px + 2px);
}
.lsl-keyboard-input-wrapper-small {
  height: calc(24px + 8px + 2px);
  // height: calc(@small + 8px + 2px);
}

.svgIcon-large {
  width: 45px;
  height: 45px;
  // width: @large;
  // height: @large;
}
.svgIcon-middle {
  width: 32px;
  height: 32px;
  // width: @middle;
  // height: @middle;
}
.svgIcon-small {
  width: 24px;
  height: 24px;
  // width: @small;
  // height: @small;
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
