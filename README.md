# unocss-preset-vidstack [![npm](https://img.shields.io/npm/v/unocss-preset-vidstack)](https://npmjs.com/package/unocss-preset-vidstack)

UnoCSS preset for [Vidstack Player](https://www.vidstack.io/docs/wc/player/styling/tailwind).

## Usage
```shell
pnpm i -D unocss-preset-vidstack unocss
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetVidstack } from 'unocss-preset-vidstack'

export default defineConfig({
  presets: [
    // ...
    presetVidstack({
      webComponents: true
    }),
  ],
  variants: [
    // https://www.vidstack.io/docs/wc/player/styling/tailwind#hocus
    (matcher) => {
        if (!matcher.startsWith('hocus:'))
          return matcher
        return {
          matcher: matcher.replace(/^hocus:/, ''),
          selector: s => `${s}:hover, ${s}:focus-visible`,
        }
      },
  ],
})
```

## License

[MIT](./LICENSE) License © 2023 [canstand](https://github.com/canstand)
