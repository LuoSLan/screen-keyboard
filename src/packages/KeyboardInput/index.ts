import type { App } from 'vue'
import keyboardInput from "./src/KeyboardInput.vue";

keyboardInput.install = (app: App) => {
  keyboardInput.name = "KeyboardInput";
  app.component(keyboardInput.name, keyboardInput);
};
export const KeyboardInput = keyboardInput;