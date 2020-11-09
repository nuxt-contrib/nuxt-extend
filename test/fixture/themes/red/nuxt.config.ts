import { resolve } from 'path'

export default {
  name: 'baseThemeEx',
  rootDir: __dirname,
  extends: '../base/nuxt.config',

  components: [
    resolve(__dirname, 'components')
  ],

  publicRuntimeConfig: {
    color: 'red'
  }
}
