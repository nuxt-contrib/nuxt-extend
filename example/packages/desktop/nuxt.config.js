import { nuxtConfig } from 'nuxt-extend'

console.log(nuxtConfig({
  name: '@app/desktop',
  extends: '@app/base/nuxt.config'
}))

export default nuxtConfig({
  name: '@app/desktop',
  extends: '@app/base/nuxt.config'
})
