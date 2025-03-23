import { Keyboard as KeyboardType, KeyboardInput as KeyboardInputType } from '../packages';
// import { Keyboard as KeyboardType } from '../packages/Keyboard'
// import { KeyboardInput as KeyboardInputType } from '../packages/KeyboardInput'

declare const Keyboard: typeof KeyboardType;
declare const KeyboardInput: typeof KeyboardInputType;

export { Keyboard, KeyboardInput };

declare const _default: {
  install: (Vue: any) => void
};
export default _default