import type { Preset } from 'unocss'
import { variantMatcher } from '@unocss/preset-mini/utils'

export interface PresetVidstackOptions {
  // Optimize output by specifying player selector.
  selector?: string
  // Change the media variants prefix.
  prefix?: string
  // Enables more efficient selectors.
  webComponents?: boolean
}

const _mediaAttributes = [
  'airplay',
  'autoplay-error',
  'autoplay',
  'buffering',
  'can-airplay',
  'can-fullscreen',
  'can-google-cast',
  'can-load-poster',
  'can-load',
  'can-pip',
  'can-play',
  'can-seek',
  'captions',
  'controls',
  'ended',
  'error',
  'fullscreen',
  'google-cast',
  'ios-controls',
  'live-edge',
  'live',
  'loop',
  'muted',
  'paused',
  'pip',
  'playing',
  'playsinline',
  'preview',
  'seeking',
  'started',
  'waiting',
]

// stream type
const _streamTypes = {
  'unknown': 'unknown',
  'on-demand': 'on-demand',
  'live': 'live',
  'dvr': 'live:dvr',
  'll': 'll-live',
  'll-dvr': 'll-live:dvr',
}

function genVariants(options?: PresetVidstackOptions) {
  const selector = options?.selector ?? (options?.webComponents ? 'media-player' : 'div')
  const prefix = options?.prefix ? `${options?.prefix}-` : 'media-'

  const results = []

  // media-type + view type
  for (const type of ['audio', 'video', 'unknown']) {
    // e.g, media-video: => data-media-type="video"
    results.push(variantMatcher(`${prefix}${type}`, input => ({ prefix: `${selector}[data-media-type="${type}"] ${input.prefix}` })))
    results.push(variantMatcher(`not-${prefix}${type}`, input => ({ prefix: `${selector}:not([data-media-type="${type}"]) ${input.prefix}` })))
    // e.g, media-view-video: => data-view-type="video"
    results.push(variantMatcher(`${prefix}view-${type}`, input => ({ prefix: `${selector}[data-view-type="${type}"] ${input.prefix}` })))
    results.push(variantMatcher(`not-${prefix}view-${type}`, input => ({ prefix: `${selector}:not([data-view-type=${type}"]) ${input.prefix}` })))
  }

  for (const [type, attrName] of Object.entries(_streamTypes)) {
    // e.g, media-stream-live: => data-stream-type="video"
    results.push(variantMatcher(`${prefix}${type}`, input => ({ prefix: `${selector}[data-stream-type="${attrName}"] ${input.prefix}` })))
    results.push(variantMatcher(`${prefix}${type}`, input => ({ prefix: `${selector}:not([data-stream-type="${attrName}"]) ${input.prefix}` })))
  }

  // remote playback state
  for (const attr of ['connected', 'connecting', 'disconnected']) {
    // e.g, media-remote-connecting: => data-remote-state="connecting"
    results.push(variantMatcher(`${prefix}remote-${attr}`, input => ({ prefix: `${selector}[data-remote-state="${attr}"] ${input.prefix}` })))
    results.push(variantMatcher(`not-${prefix}remote-${attr}`, input => ({ prefix: `${selector}:not([data-remote-state="${attr}"]) ${input.prefix}` })))
  }

  for (const attr of _mediaAttributes) {
    results.push(variantMatcher(`${prefix}${attr}`, input => ({ prefix: `${selector}[data-${attr}] ${input.prefix}` })))
    results.push(variantMatcher(`not-${prefix}${attr}`, input => ({ prefix: `${selector}:not([data-${attr}]) ${input.prefix}` })))
  }
  return results
}

export function presetVidstack(options: PresetVidstackOptions = {}): Preset {
  return {
    name: 'unocss-preset-vidstack',
    variants: [
      ...genVariants(options),
    ],
  }
}
