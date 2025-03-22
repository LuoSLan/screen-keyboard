<!--
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-19 22:21:25
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-22 01:17:12
 * @FilePath: \screen-keyboard\src\packages\keyboard\Keyboard.vue
 * @Description: 虚拟键盘
-->
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { PropType } from 'vue';
import { useKeyboard, useKeyboardPotion } from './hooks/useKeyboard';
import NumberKeyboard from './components/NumberKeyboard.vue';
import TextKeyboard from './components/TextKeyboard.vue';

const emit = defineEmits([
  'close',
  'input',
  'confirm',
  'toggleKeyboardType',
  'delete',
  'deleteAll',
]);
const props = defineProps({
  defaultType: {
    type: String as PropType<'number' | 'text'>,
    default: 'number',
  },
  allowToggle: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  position: {
    type: [String, Array] as PropType<
      | 'center'
      | 'leftTop'
      | 'rightTop'
      | 'leftBottom'
      | 'rightBottom'
      | [number, number]
    >,
    default: 'leftBottom',
  },
  canMove: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
});
const { moveX, moveY, isMoving } = useKeyboardPotion(props);

// const symbols: string[] = ["+", "-", "=", ".", "/", "@"];

const { keyboardEl, keyDown, touchStart } = useKeyboard({
  moveX,
  moveY,
  isMoving,
});

type KeyboardType = 'number' | 'text';
const keyboardType = ref<KeyboardType>(props.defaultType);

/**
 * 切换键盘类型
 * @param type 键盘类型
 */
const toggleKeyboardType = (type?: KeyboardType): void => {
  if (!props.allowToggle) return;

  if (!type) {
    type = keyboardType.value === 'number' ? 'text' : 'number';
  } else {
    type = type === 'number' ? 'number' : 'text';
  }
  keyboardType.value = type;
  emit('toggleKeyboardType', type);
};

const insertTxtAndSetCursor = (...ags) => {
  emit('input', ...ags);
};

const handleConfirm = () => {
  emit('confirm');
};

const close = () => {
  emit('close');
};
</script>

<template>
  <div
    class="keyboard"
    :class="[keyboardType === 'number' ? 'numberKeyboard' : 'textKeyboard']"
    ref="keyboardEl"
    :style="{
      left: moveX + 'px',
      bottom: moveY + 'px',
      opacity: isMoving ? 0.8 : 1,
    }"
  >
    <div
      class="drag"
      :class="{ moveCursor: props.canMove }"
      @mousedown="(e) => props.canMove && keyDown(e)"
      @touchstart="(e) => props.canMove && touchStart(e)"
    >
      <p></p>
      <div @click="close" @mousedown.stop @mousemove.stop>
        <!-- <img src="./arrow.svg" alt="" /> -->
        <span>关闭</span>
      </div>
    </div>
    <template v-if="keyboardType === 'number'">
      <NumberKeyboard
        :allowToggle="props.allowToggle"
        @confirm="handleConfirm"
        @insertTxtAndSetCursor="insertTxtAndSetCursor"
        @toggleKeyboardType="toggleKeyboardType"
      />
    </template>
    <template v-else>
      <TextKeyboard
        :allowToggle="props.allowToggle"
        @confirm="handleConfirm"
        @insertTxtAndSetCursor="insertTxtAndSetCursor"
        @toggleKeyboardType="toggleKeyboardType"
      />
    </template>
  </div>
</template>

<style lang="less" scoped>
.numberKeyboard {
  min-width: 285px;
  max-width: 353px;
  height: 306px;
}

.textKeyboard {
  min-width: 385px;
  max-width: 600px;
  height: 245px;
}
.keyboard * {
  box-sizing: border-box;

  -webkit-user-select: none; /* 适用于Webkit浏览器 */
  -moz-user-select: none; /* 适用于Firefox */
  -ms-user-select: none; /* 适用于IE10 */
  user-select: none; /* 标准语法 */
}

.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  background-color: #d6d7db;
  // min-width: 285px;
  // max-width: 353px;
  // height: 245px;
  // height: 306px;
  > .moveCursor {
    cursor: move;
  }
  > .drag {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 15%;
    // cursor: move;

    > p {
      width: 30%;
      height: 13%;
      background-color: #fff;
      border-radius: 5px;
    }

    > div {
      position: absolute;
      top: 50%;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18.3%;
      height: 100%;
      transform: translateY(-50%);
      cursor: pointer;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
        height: 60%;
        content: '';
        background-color: #fff;
        transform: translateY(-50%);
      }

      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 45%;
        user-select: none;
        transform: translate(-50%, -50%);
      }

      > span {
        // position: absolute;
        // top: 25%;
        // left: 25%;
        font-size: 16px;
        user-select: none;
      }
    }
  }
}
</style>
