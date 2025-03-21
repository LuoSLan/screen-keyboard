/*
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-20 00:03:01
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-20 23:06:53
 * @FilePath: \screen-keyboard\src\packages\Keyboard\hooks\useAttrs.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getCurrentInstance, reactive, shallowRef, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Recordable } from '../types/keyboard'

interface Params {
  excludeListeners?: boolean
  excludeKeys?: string[]
  excludeDefaultKeys?: boolean
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export function entries<T>(obj: Recordable<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]])
}

export function useAttrs(params: Params = {}): Ref<Recordable> | object {
  const instance = getCurrentInstance()
  if (!instance)
    return {}

  const { excludeListeners = false, excludeKeys = [], excludeDefaultKeys = true } = params
  const attrs = shallowRef({})
  const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys ? DEFAULT_EXCLUDE_KEYS : [])

  // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
  instance.attrs = reactive(instance.attrs)

  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)))
        acm[key] = val

      return acm
    }, {} as Recordable)

    attrs.value = res
  })

  return attrs
}
