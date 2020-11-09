# `@nuxt/theme`

Magically theme/extends support to Nuxt 2 projects!

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
  extends: '@nuxt/docs-theme'
})
```

**Note:** While it is not necessary, it is recommended to also follow [Theme Author](#theme-author) section for your project so it is reusable for others.

### Theme Author

- Update `nuxt.config` and ensure required `rootDir` and `name` properties are provided

```js
import { resolveConfig } from '@nuxt/theme'

export default resolveConfig({
  name: 'myTheme'
  rootDir: __direname
}

- Instead of using `~/` or `@/` aliases, use `~myTheme` or `@myTheme`

## License

MIT
