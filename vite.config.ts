import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join, resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist', // 输出目录
      insertTypesEntry: true, // 自动插入 types 入口
      tsconfigPath: './tsconfig.app.json', // 如果是vite生成的项目，需要指明为./tsconfig.app.json
      rollupTypes: true
    }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/packages/index.ts'),
      name: 'ScreenKeyboard',
      // fileName:'screen-keyboard',
      // fileName: (format) => `screen-keyboard.${format}.js`,
      // formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: {
      // 在打包代码时移除 console、debugger 和 注释
      compress: {
        /* (default: false) -- Pass true to discard calls to console.* functions.
          If you wish to drop a specific function call such as console.info and/or
          retain side effects from function arguments after dropping the function
          call then use pure_funcs instead
        */
        drop_console: true, // 生产环境时移除console
        drop_debugger: true,
      },
      format: {
        comments: false, // 删除注释comments
      },
    },
  },
});
