/*
 * @Author: LuoSLan 1550527769@qq.com
 * @Date: 2025-03-21 23:25:50
 * @LastEditors: LuoSLan 1550527769@qq.com
 * @LastEditTime: 2025-03-22 00:24:58
 * @FilePath: \screen-keyboard\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': '/src',
  //   },
  // },
  build: {
    lib: {
      entry: './src/packages/index.ts',
      name: 'ScreenKeyboard',
      fileName:'screen-keyboard',
      // fileName: (format) => `screen-keyboard.${format}.js`,
      // formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: "named",
        globals: {
          vue: 'Vue'
        },
      },
    },
    minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: { // 在打包代码时移除 console、debugger 和 注释
      compress: {
        /* (default: false) -- Pass true to discard calls to console.* functions.
          If you wish to drop a specific function call such as console.info and/or
          retain side effects from function arguments after dropping the function
          call then use pure_funcs instead
        */
        drop_console: true, // 生产环境时移除console
        drop_debugger: true
      },
      format: {
        comments: false // 删除注释comments
      }
    }
  }
})
