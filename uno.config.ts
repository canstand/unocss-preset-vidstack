import { defineConfig, presetUno } from 'unocss'
import { presetVidstack } from './src'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetUno(),
    presetVidstack({
      webComponents: true,
    }),
  ],
})
