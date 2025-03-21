<!--
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-19 22:28:21
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-21 21:37:24
 * @FilePath: \screen-keyboard\src\packages\Keyboard\components\NumberKeyboard.vue
 * @Description: 该组件是一个数字键盘，包含数字0-9、小数点、负号、删除键和清空键
-->
<script setup lang="ts">
import { InsertTxtAndSetCursor } from '../types/keyboard'

const emit = defineEmits(['insertTxtAndSetCursor', 'toggleKeyboardType', 'confirm'])

const props = defineProps<{
  allowToggle: boolean
}>();


const insertTxtAndSetCursor: InsertTxtAndSetCursor = (key, isDelete, delAll) => {
  emit('insertTxtAndSetCursor', key, isDelete, delAll);
};

const toggleKeyboardType = () => {
  emit('toggleKeyboardType');
};

const handleConfirm = () => {
  emit('confirm');
};
</script>

<template>
  <div class="lsl-number-keyboard">
    <div class="left">
      <div class="item" @click="insertTxtAndSetCursor('.')">
        <span>.</span>
      </div>
      <div class="item" @click="insertTxtAndSetCursor('-')">
        <span>-</span>
      </div>
      <div class="item" :class="{ 'disabled': !props.allowToggle }" @click="() => toggleKeyboardType()">
        <img class="svgIcon" src="../../../../assets/abc.svg" alt="abc" />
      </div>
    </div>
    <div class="right">
      <div class="left">
        <div class="item" v-for="i in 9" :key="i" @click="insertTxtAndSetCursor(i.toString())">
          {{ i }}
        </div>
      </div>
      <div class="right">
        <div class="item" @click="insertTxtAndSetCursor('', true)">
          <img class="svgIcon" src="../../../../assets/backspace_white.svg" alt="backspace" />
        </div>
        <div class="item" @click="insertTxtAndSetCursor('', false, true)">
          <span>清空</span>
        </div>
        <div class="item" @click="insertTxtAndSetCursor('0')">0</div>
      </div>
    </div>
  </div>
  <div class="lsl-number-keyboard-bottom">
    <div class="confirm" @click="handleConfirm">确认</div>
  </div>
</template>

<style lang="less" scoped>

.lsl-number-keyboard {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 15% - 17%);
  padding: 2%;

  .svgIcon {
    width: 45px;
    height: 45px;
  }


  >.left {
    display: flex;
    flex: 15;
    flex-wrap: wrap;
    align-content: space-between;
    height: 100%;
    margin-right: 2%;
    overflow: auto;
    user-select: none;

    &::-webkit-scrollbar {
      display: none;
    }

    >div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 30.8%;
      font-size: 40px;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 6px;

      &:active {
        background-color: #a1a8b8;
      }
    }

    >.disabled {
      pointer-events: none;
      cursor: not-allowed;
      filter: brightness(2.3) grayscale(0.5);
    }

    >.confirm {
      height: 65.6%;
      font-size: 24px;
      writing-mode: vertical-rl;
    }
  }

  >.right {
    display: flex;
    flex: 77;
    justify-content: space-between;
    height: 100%;
    user-select: none;
    border-radius: 5px;

    >.left {
      display: flex;
      flex-wrap: wrap;
      place-content: space-between space-between;
      width: 77%;
      height: 100%;

      >.item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 31.5%;
        height: 30.8%;
        // font-size: 18px;
        font-size: 24px;
        background-color: #fff;
        border-radius: 5px;

        &:active {
          background-color: #adb4be;
        }

        &:nth-of-type(3n) {
          margin-right: 0;
        }

        &:nth-of-type(7),
        &:nth-of-type(8),
        &:nth-of-type(9) {
          margin-bottom: 0;
        }
      }
    }

    >.right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 21%;
      height: 100%;

      >.item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30.8%;
        font-size: 24px;
        background-color: #adb4be;
        border-radius: 5px;

        >span {
          font-size: 20px;
        }

        &:active {
          background-color: #7e8492;
        }
      }
    }
  }
}

.lsl-number-keyboard-bottom {
  display: flex;
  justify-content: center;
  height: 17%;
  padding: 2%;
  padding-top: 0;



  >.confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 24px;
    background-color: #fff;
    border-radius: 5px;

    &:active {
      background-color: #adb4be;
    }
  }

}
</style>
