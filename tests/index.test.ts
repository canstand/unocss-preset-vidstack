import { createGenerator } from 'unocss'
import { expect, it } from 'vitest'
import { presetUno } from 'unocss'
import { presetVidstack } from '../src'

it('webComponents true', async () => {
  const uno = createGenerator({
    presets: [presetUno({preflight: false}), presetVidstack({webComponents: true})],
  })
  const presets = uno.config.presets
  expect(presets).toHaveLength(2)

  const { css } = await uno.generate('media-controls:opacity-100')

  expect(css).toMatchInlineSnapshot(`
    "/* layer: default */
    media-player[data-controls] .media-controls\\:opacity-100{opacity:1;}"
  `)
})

it('webcomponents false', async () => {
  const uno = createGenerator({
    presets: [presetUno({preflight: false}), presetVidstack({webComponents: false})],
  })
  const presets = uno.config.presets
  expect(presets).toHaveLength(2)

  const { css } = await uno.generate('media-controls:opacity-100')

  expect(css).toMatchInlineSnapshot(`
    "/* layer: default */
    div[data-controls] .media-controls\\:opacity-100{opacity:1;}"
  `)
})
