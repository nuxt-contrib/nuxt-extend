import { dirname } from 'path'
import Hookable, { configHooksT } from 'hookable'
import defu from 'defu'
import { NuxtConfig } from '@nuxt/types'

declare module '@nuxt/types' {
  interface NuxtConfig {
    hooks: configHooksT
    name?: string
    extends?: string
    alias?: { [key: string]: string }
  }
}

export function extendConfig (base: NuxtConfig | string, target: NuxtConfig): NuxtConfig {
  // Resolve Configs
  base = resolveConfig(base)
  target = resolveConfig(target)

  // Ensure base has require fileds
  if (!base.name) {
    throw new Error('Base config is missing `name` property')
  }
  if (!base.rootDir) {
    throw new Error('Base config is missing `rootDir` property')
  }
  if (!base.srcDir) {
    base.srcDir = base.rootDir
  }

  // Ensure there is no name conflict
  if (target.alias && target.alias['~' + base.name]) {
    throw new Error('Theme name conflict: ' + base.name)
  }

  // Assign aliases for base
  base.alias = base.alias || {}
  base.alias['~' + base.name] = base.srcDir
  base.alias['~~' + base.name] = base.rootDir
  base.alias['@' + base.name] = base.srcDir
  base.alias['@@' + base.name] = base.rootDir

  // Custom merges
  const override = {
    hooks: Hookable.mergeHooks(base.hooks || {}, target.hooks || {})
  }

  // Merge with defu
  return defu.arrayFn(override, target, base)
}

export function resolveConfig (config: string | NuxtConfig): NuxtConfig {
  if (typeof config === 'string') {
    const jiti = require('jiti')()

    const name = config
    const nuxtConfigFile = jiti.resolve(config)

    config = jiti(nuxtConfigFile) as NuxtConfig

    if (!config.rootDir) {
      config.rootDir = dirname(nuxtConfigFile)
    }

    if (!config.name) {
      config.name = name
    }
  }

  if (config.extends) {
    config = extendConfig(config.extends, config)
  }

  return config
}
