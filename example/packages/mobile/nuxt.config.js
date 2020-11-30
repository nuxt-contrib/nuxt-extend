import { nuxtConfig } from 'nuxt-extend'

export default nuxtConfig({
  name: '@app/mobile',
  extends: '@app/base/nuxt.config',
  router: {
    base: '/m'
  }
})
