/*
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-21 23:25:50
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-23 21:33:37
 * @FilePath: \screen-keyboard\src\packages\Keyboard\src\hooks\useValue.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, getCurrentInstance, nextTick, reactive, readonly, toRaw, unref, watchEffect } from "vue";
import type { DeepReadonly, Ref, UnwrapRef, WritableComputedRef } from 'vue'
import type { Recordable } from "../types/keyboard";

export function useValue<T extends Recordable, K extends keyof T, V = UnwrapRef<T[K]>>(
  props: T,
  key?: K,
  changeEvent?: string,
  emitData?: Ref<any[]>
): [WritableComputedRef<V>, (val: V) => void, DeepReadonly<V>];

export function useValue<T extends Recordable>(props: T, key: keyof T = 'value', changeEvent = 'change', emitData?: Ref<any[]>) {
  const instance = getCurrentInstance()
  const emit = instance?.emit
 
  const innerState = reactive({
    value: props[key], 
  });
  const defaultState = readonly(innerState)
  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T]
  }

  watchEffect(() => {
    innerState.value = props[key];
    
  });
  const state: any = computed({
    get() {
      return innerState.value || ''
    },
    set(value) {
      if (value === defaultState.value) {
        return;
      }
  
      innerState.value = value as T[keyof T];
      nextTick(() => {
        emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []))
      })
    },
  });

  return [state, setState, defaultState]
}