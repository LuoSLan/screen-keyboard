/*
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-19 22:44:24
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-21 00:17:25
 * @FilePath: \screen-keyboard\src\packages\Keyboard\types\keyboard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { EmitFn } from 'vue';

export type InsertTxtAndSetCursor = (text: string, del?: boolean, delAll?: boolean) => string | void;
export type EmitOptions<E> = {
  emitFn: EmitFn<E>,
  changeEventName: string,
  inputEventName: string, 
}

export type Recordable<T = any> = Record<string, T>

export type KeyboardPosition =
|'center'
| 'leftTop'
| 'rightTop'
| 'leftBottom'
| 'rightBottom'
| 'topCenter'
| 'bottomCenter'
| [number, number]
