# `nuxt-extend`

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![ci][ci-src]][ci-href]

Add config extending support to Nuxt 2 projects!

## Features

- Support nested `extends`
- Smartly merge config and hooks
- Allow theme development to be like a normal nuxt project

## Usage

### Common Setup

Install `nuxt-extend` as a dependency:

```sh
# yarn
yarn add nuxt-extend

# npm
npm i nuxt-extend
```

Update `nuxt.config` file:

```js
import { resolveConfig } from 'nuxt-extend'

export default resolveConfig({
  // Your actual Nuxt configuration
})
```

### Parent

Use `extends` key in `nuxt.config`:

```js
import { resolveConfig } from 'nuxt-extend'

export default resolveConfig({
  extends: '@nuxt/docs-theme',
})
```

### Child

1. Update `nuxt.config` and ensure required `rootDir` and `name` properties are provided

```js
import { resolveConfig } from 'nuxt-extend'

export default resolveConfig({
  rootDir: __dirname,
  name: 'myTheme',
}
```

**Note:** If you are extending another theme, `rootDir` should be ONLY provided if you want to also extend project.

2. Instead of using `~/` or `@/` aliases, use `~myTheme` or `@myTheme`

## License

MIT. Made with 💖

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/nuxt-extend?style=flat-square
[npm-v-href]: https://npmjs.com/package/nuxt-extend

[npm-d-src]: https://img.shields.io/npm/dm/nuxt-extend?style=flat-square
[npm-d-href]: https://npmjs.com/package/nuxt-extend

[ci-src]: https://img.shields.io/github/workflow/status/nuxt-community/nuxt-extend/ci/master?style=flat-square
[ci-href]: https://github.com/nuxt-community/nuxt-extend/actions?query=workflow%3Aci
