/*
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-20 23:13:28
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-20 23:39:21
 * @FilePath: \screen-keyboard\src\packages\Keyboard\hooks\useValue.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed, getCurrentInstance, nextTick, reactive, readonly, toRaw, unref, watchEffect } from "vue";
import type { DeepReadonly, Ref, UnwrapRef, WritableComputedRef } from 'vue'
import type { Recordable } from "../types/keyboard";

export function useValue<T extends Recordable, K extends keyof T, V = UnwrapRef<T[K]>>(
  props: T,
  key?: K,
  changeEvent?,
  emitData?: Ref<any[]>
): [WritableComputedRef<V>, (val: V) => void, DeepReadonly<V>];

export function useValue<T extends Recordable>(props: T, key: keyof T = 'value', changeEvent = 'change', emitData?: Ref<any[]>) {
  const instance = getCurrentInstance()
  const emit = instance?.emit
 
  const innerState = reactive({
    value: props.value, // Changed from props[key] to props.value
  });
  const defaultState = readonly(innerState)
  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T]
  }

  watchEffect(() => {
    innerState.value = props.value;
    
  });
  const state: any = computed({
    get() {
      
  
      //修复多选时空值显示问题（兼容值为0的情况）
      return innerState.value == null || innerState.value === ''
        ? []
        : innerState.value;
    },
    set(value) {
    
 
      // if (isEqual(value, defaultState.value))
      //   return
      if (value === defaultState.value) {
        return;
      }
  
      innerState.value = value as string;
      nextTick(() => {
        emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []))
        // https://antdv.com/docs/vue/migration-v3-cn
        // antDv3升级后需要调用这个方法更新校验的值
        // nextTick(() => formItemContext.onFieldChange());
      })
    },
  });

  return [state, setState, defaultState]
}