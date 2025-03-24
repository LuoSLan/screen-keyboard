import type { App } from 'vue'
import keyboard from "./src/Keyboard.vue";

keyboard.install = (app: App) => {
  keyboard.name = "Keyboard";
  app.component(keyboard.name, keyboard);
};

export const Keyboard = keyboard;
export * from "./src/types/keyboard";
export * from "./src/hooks/useKeyboard";
export * from "./src/hooks/useAttrs";
export * from "./src/hooks/useValue";