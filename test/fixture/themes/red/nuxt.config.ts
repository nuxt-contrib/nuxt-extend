import { nuxtConfig } from '../../../../src/index'

export default nuxtConfig({
  name: 'RedTheme',
  extends: '../base/nuxt.config',
  rootDir: __dirname,

  publicRuntimeConfig: {
    color: 'red'
  }
})
