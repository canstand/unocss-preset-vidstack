import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('media-'),
        },
      },
    }),
    UnoCSS()
  ],
})
