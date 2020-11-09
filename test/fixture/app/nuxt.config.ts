import { resolve } from 'path'
import type { NuxtConfig } from '@nuxt/types'
import { resolveConfig } from '../../../src/index'

export default <NuxtConfig>resolveConfig({
  name: 'myApp',
  rootDir: __dirname,
  extends: '../themes/red/nuxt.config',

  components: [
    resolve(__dirname, 'components')
  ]
})
