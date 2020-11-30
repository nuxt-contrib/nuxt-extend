import { resolve, dirname } from 'path'
import { existsSync, realpathSync } from 'fs'
import Hookable, { configHooksT } from 'hookable'
import defu from 'defu'
import jiti from 'jiti'
import type { NuxtConfig } from '@nuxt/types'

declare module '@nuxt/types' {
  interface NuxtConfig {
    hooks?: configHooksT
    name?: string
    extends?: string
    alias?: { [key: string]: string }
  }
}

export function nuxtConfig (config: NuxtConfig): NuxtConfig {
  config = resolveConfig(config, 0)

  delete config._file
  delete config._dir
  delete config.name
  delete config.extends

  return config
}

function resolveConfig (config: NuxtConfig, level) {
  if (typeof config === 'function') {
    throw new TypeError('extending is not possible with nuxt config as a function')
  }

  const dir = config.srcDir || config.rootDir || config._dir

  if (dir && config.name) {
    config.alias = config.alias || {}
    config.alias[config.name] = dir
  }

  if (dir && config.components === undefined) {
    config.components = []
    const componentsDir = resolve(dir, 'components')
    if (existsSync(componentsDir)) {
      config.components.push({ path: componentsDir })
    }
    const globalComponentsDir = resolve(dir, 'components/global')
    if (existsSync(globalComponentsDir)) {
      config.components.push({ path: globalComponentsDir, global: true })
    }
  }

  if (config.extends) {
    const base = loadConfig(config.extends, dir)
    return mergeConfig(config, resolveConfig(base, level + 1), level)
  }

  return config
}

function loadConfig (configFile: string, from: string): NuxtConfig {
  const _require = jiti(from)
  configFile = realpathSync(_require.resolve(configFile))

  let config = _require(configFile)
  config = (config.default || config) as NuxtConfig
  config._file = configFile
  config._dir = dirname(configFile)

  return config
}

function mergeConfig (target: NuxtConfig, base: NuxtConfig, level): NuxtConfig {
  // Custom merges
  const override: NuxtConfig = {}

  // Merge hooks
  override.hooks = Hookable.mergeHooks(base.hooks || {}, target.hooks || {})

  // Merge components
  if (base.components || target.components) {
    override.components = [
      ...normalizeComponents(target.components),
      ...normalizeComponents(base.components, true)
    ]
  }

  // Mege with defu
  return { ...defu.arrayFn(target, base), ...override }
}

function normalizeComponents (components: NuxtConfig['components'], isBase?: boolean) {
  if (typeof components === 'boolean' || !components) {
    components = []
  }

  if (!Array.isArray(components)) {
    // TODO: Deprecate components: { dirs } support from @nuxt/components
    throw new TypeError('`components` should be an array: ' + typeof components)
  }

  components = components.map(dir => ({
    ...(typeof dir === 'string' ? { path: dir } : dir)
  }))

  for (const component of components) {
    component.level = (component.level || 0) + (isBase ? 1 : 0)
  }

  return components
}
