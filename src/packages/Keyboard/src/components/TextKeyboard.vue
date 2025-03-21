<!--
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-19 22:28:17
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-21 21:46:35
 * @FilePath: \screen-keyboard\src\packages\Keyboard\components\TextKeyboard.vue
 * @Description: 该组件是一个文本键盘，包含字母A-Z、空格、删除键和确认键
-->
<script setup lang="ts">
import { ref } from 'vue'
import uppercaseSvg from '../../../../assets/uppercase.svg'
import lowercaseSvg from '../../../../assets/lowercase.svg'

const emit = defineEmits(['insertTxtAndSetCursor', 'toggleKeyboardType', 'confirm'])

const props = defineProps<{
  allowToggle: boolean
}>();

const insertTxtAndSetCursor = (key: string, isDelete?: boolean) => {
  const finalKey = isUpperCase.value ? key : key.toLowerCase();
  emit('insertTxtAndSetCursor', finalKey, isDelete);
};

const toggleKeyboardType = () => {
  emit('toggleKeyboardType');
};

const handleConfirm = () => {
  emit('confirm');
};

const isUpperCase = ref(false);
/**
 * @description: 切换大小写
 */
function toggleUpperCase() {
  props.allowToggle && (isUpperCase.value = !isUpperCase.value);
}

</script>

<template>
  <div class="lsl-text-keyboard">
    <div class="textBoard">
      <div class="row-wrapper">
        <div class="row">
          <div class="item" v-for="key in ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']" :key="key"
            @click="insertTxtAndSetCursor(key)">{{ isUpperCase ? key : key.toLowerCase()
            }}</div>
        </div>
      </div>
      <div class="row-wrapper">
        <div class="row">
          <div class="item" v-for="key in ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']" :key="key"
            @click="insertTxtAndSetCursor(key)">{{ isUpperCase ? key : key.toLowerCase()
            }}</div>
        </div>
      </div >
      <div class="row-wrapper">
        <div class="row">
          <div class="item upper"@click="toggleUpperCase">
            <img class="svgIcon" :src="isUpperCase ? lowercaseSvg : uppercaseSvg" alt="toggle case">
          </div>
          <div class="item" v-for="key in ['Z', 'X', 'C', 'V', 'B', 'N', 'M']" :key="key"
            @click="insertTxtAndSetCursor(key)">{{
              isUpperCase ? key : key.toLowerCase() }}</div>
          <div class="item delete" @click="insertTxtAndSetCursor('', true)">
            <img class="svgIcon" src="../../../../assets/backspace.svg" alt="backspace" />
          </div>
        </div>
      </div>
      <div class="row-wrapper">
        <div class="row">
          <div class="item toggle"  :class="{ 'disabled': !props.allowToggle }"  @click="() => toggleKeyboardType()">
            <img class="svgIcon" src="../../../../assets/123.svg" alt="number">
          </div>
          <div class="item space" @click="insertTxtAndSetCursor(' ')">
            <img class="svgIcon" src="../../../../assets/space_bar.svg" alt="space" />
          </div>
          <div class="item confirm" @click="handleConfirm">
            <span>确认</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>

.lsl-text-keyboard {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 15%);
  padding: 2%;


  .svgIcon {
    width: 45px;
    height: 45px;
  }

  >.textBoard {
    display: flex;
    flex-direction: column;
    place-content: space-between space-between;
    width: 100%;
    height: 100%;

    >.row-wrapper {
      margin-right:auto;
      margin-left:auto;

      >.row {
        display: flex;
        gap:5px;
        align-items:flex-end;
        height:100%;

        >.item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 41px;
          // margin:2%;
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

        >.disabled {
          pointer-events: none;
          cursor: not-allowed;
          filter: brightness(2.3) grayscale(0.5);
        }

        >.space {
          width:280px;
        }

        >.toggle,
        >.confirm {
          width: 137.5px;
        }

        >.delete ,
        >.upper {
          width: 80.5px;
        }
      }
    }
  }

}
</style>
