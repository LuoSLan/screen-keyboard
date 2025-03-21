/*
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-21 21:37:56
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-21 21:48:57
 * @FilePath: \screen-keyboard\src\packages\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Keyboard } from "./Keyboard";
import { KeyboardInput } from "./KeyboardInput";

const components = [Keyboard, KeyboardInput];

const install = (app: any) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { Keyboard, KeyboardInput };
export default {
  install,
};