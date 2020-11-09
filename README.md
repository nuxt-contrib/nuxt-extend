# `@nuxt/theme`

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![ci][ci-src]][ci-href]

Add theme/extends support to Nuxt 2 projects!

## Features

- Forward compatible with nuxt3 multi app
- Support neseted `extends`
- Smartly merge config and hooks
- Allow theme development to be like a normal nuxt project

## Usage

### Common Setup

Install `@nuxt/theme` as a dependency:

```sh
# yarn
yarn add @nuxt/theme

# npm
npm i @nuxt/theme
```

Update `nuxt.config` file:

```js
import { resolveConfig } from '@nuxt/theme'

export default resolveConfig({
})
```

### Theme Consumer

Use `extends` key in `nuxt.config`:

```js
import { resolveConfig } from '@nuxt/theme'

export default resolveConfig({
  extends: '@nuxt/docs-theme',
})
```

### Theme Author

- Update `nuxt.config` and ensure required `rootDir` and `name` properties are provided

```js
import { resolveConfig } from '@nuxt/theme'

export default resolveConfig({
  rootDir: __direname,
  name: 'myTheme',
}
```

**Note:** If you are extending another theme, `rootDir` should be ONLY provided if you want to also extend project.

- Instead of using `~/` or `@/` aliases, use `~myTheme` or `@myTheme`

## License

MIT. Made with 💖

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/@nuxt/theme?style=flat-square
[npm-v-href]: https://npmjs.com/package/@nuxt/theme

[npm-d-src]: https://img.shields.io/npm/dm/@nuxt/theme?style=flat-square
[npm-d-href]: https://npmjs.com/package/@nuxt/theme

[ci-src]: https://img.shields.io/github/workflow/status/nuxt/theme/ci/master?style=flat-square
[ci-href]: https://github.com/nuxt/theme/actions?query=workflow%3Aci
