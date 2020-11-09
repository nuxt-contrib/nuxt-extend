import { dirname } from 'path'
import Hookable, { configHooksT } from 'hookable'
import defu from 'defu'
import type { NuxtConfig } from '@nuxt/types'

declare module '@nuxt/types' {
  interface NuxtConfig {
    _level?: number
    hooks?: configHooksT
    name?: string
    extends?: string
    alias?: { [key: string]: string }
  }
}

export function resolveConfig (config: string | NuxtConfig, from: string = process.cwd(), level = 0): NuxtConfig {
  if (typeof config === 'string') {
    const jiti = require('jiti')(from)
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

  if (!config.rootDir) {
    config.rootDir = from
  }

  config._level = level

  if (config.extends) {
    const _resolvedExtends = resolveConfig(config.extends, config.rootDir, level + 1)
    config = extendConfig(config, _resolvedExtends)
  }

  return config
}

export function extendConfig (target: NuxtConfig, base: NuxtConfig): NuxtConfig {
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
  const override: NuxtConfig = {}

  // Merge hooks
  override.hooks = Hookable.mergeHooks(base.hooks || {}, target.hooks || {})

  // Merge components prop
  if (base.components || target.components) {
    override.components = [
      ...normalizeComponents(target.components, { level: target._level }),
      ...normalizeComponents(base.components, { level: base._level })
    ]
  }

  // Merge with defu
  return { ...defu.arrayFn(target, base), ...override }
}

function normalizeComponents (components: NuxtConfig['components'], defaults = {}) {
  if (typeof components === 'boolean' || !components) {
    components = []
  }

  if (!Array.isArray(components)) {
    // TODO: Deprecate components: { dirs } support from @nuxt/components
    throw new TypeError('`components` should be an array: ' + typeof components)
  }

  components = components.map(dir => ({
    ...defaults,
    ...(typeof dir === 'string' ? { path: dir } : dir)
  }))

  return components
}
