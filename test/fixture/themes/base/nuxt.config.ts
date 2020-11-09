import { resolve } from 'path'
import type { NuxtConfig } from '@nuxt/types'
import { resolveConfig } from '../../../../src/index'

export default <NuxtConfig>resolveConfig({
  name: 'baseTheme',
  rootDir: __dirname,
  srcDir: __dirname,

  components: [
    { path: resolve(__dirname, 'components'), global: true }
  ],

  publicRuntimeConfig: {
    color: 'blue'
  }
})
