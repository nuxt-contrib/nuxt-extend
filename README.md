# `nuxt-extend`

[![npm version][npm-v-src]][npm-v-href]
[![npm downloads][npm-d-src]][npm-d-href]
[![ci][ci-src]][ci-href]

This utility allows extending a nuxt project based on another one by smartly merging `nuxt.config` files.

It can be useful if:
- You want to share a base config across mono-repo projects
- You want to create a multi-variant (like `mobile`/`desktop`) app
- You want to create a reusable nuxt theme (like one for docs)

**Note:** Proper Multi-App ([rfc](https://github.com/nuxt/rfcs/issues/30)) is comming with nuxt3 which also
allows extending auto scanned directories like `pages/` and `store/` and merging them.

## Mobile/Desktop Demo

See [this example](./example)

## Usage

Install `nuxt-extend` as a dependency:

```sh
# yarn
yarn add nuxt-extend

# npm
npm i nuxt-extend
```

Update `nuxt.config` file:

```js
import { nuxtConfig } from 'nuxt-extend'

export default nuxtConfig({
  /* your actual nuxt configuration */
})
```

### Parent

Use `extends` key in `nuxt.config`:

```js
import { nuxtConfig } from 'nuxt-extend'

export default nuxtConfig({
  extends: '<path to base or npm package>',
})
```

### Base

- Update `nuxt.config` and ensure required `rootDir` and `name` properties are provided

```js
import { nuxtConfig } from 'nuxt-extend'

export default nuxtConfig({
  rootDir: __dirname,
  name: 'myTheme',
}
```

**Note:** If you are extending recusively, `rootDir` should be ONLY provided one one level that implements actual `pages/` and `store/`.

- Instead of using `~/` or `@/` aliases, use `~myTheme` or `@myTheme`

## License

MIT. Made with 💖

<!-- Refs -->
[npm-v-src]: https://img.shields.io/npm/v/nuxt-extend?style=flat-square
[npm-v-href]: https://npmjs.com/package/nuxt-extend

[npm-d-src]: https://img.shields.io/npm/dm/nuxt-extend?style=flat-square
[npm-d-href]: https://npmjs.com/package/nuxt-extend

[ci-src]: https://img.shields.io/github/workflow/status/nuxt-community/nuxt-extend/ci/master?style=flat-square
[ci-href]: https://github.com/nuxt-community/nuxt-extend/actions?query=workflow%3Aci
