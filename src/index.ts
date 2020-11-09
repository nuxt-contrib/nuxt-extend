import { dirname } from 'path'
import Hookable, { configHooksT } from 'hookable'
import defu from 'defu'
import type { NuxtConfig } from '@nuxt/types'

declare module '@nuxt/types' {
  interface NuxtConfig {
    _level?: Number
    hooks?: configHooksT
    name?: string
    extends?: string
    alias?: { [key: string]: string }
  }
}

export function resolveConfig (config: string | NuxtConfig, from: string = process.cwd()): NuxtConfig {
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

  if (config.extends) {
    const _resolvedExtends = resolveConfig(config.extends, config.rootDir)
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

  // Set _level
  target._level = target._level || 0
  base._level = target.level + 1

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
      ...normalizeComponents(base.components, { level: base._level }),
      ...normalizeComponents(target.components, { level: target._level })
    ]
  }

  // Merge with defu
  return defu.arrayFn(override, target, base)
}

function normalizeComponents (components: NuxtConfig['components'], dirOverride = {}) {
  if (typeof components === 'boolean') {
    components = []
  }

  if (!Array.isArray(components)) {
    // TODO: Deprecate components: { dirs } support from @nuxt/components
    throw new TypeError('`components` should be an array')
  }

  components = components.map(dir => ({
    ...(typeof dir === 'string' ? { dir } : dir),
    ...dirOverride
  }))

  return components
}
