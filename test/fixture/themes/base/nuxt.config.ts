import { nuxtConfig } from '../../../../src/index'

export default nuxtConfig({
  name: 'BaseTheme',
  rootDir: __dirname,
  srcDir: __dirname,

  publicRuntimeConfig: {
    color: 'blue'
  }
})
