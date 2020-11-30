# Extend example

This example is using `nuxt-extend` and [nuxt components](https://nuxtjs.org/docs/2.x/features/nuxt-components)
to create a multi-variant mobile/desktop nuxt application.

- Using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces) for mono-repo managenment
- Most of the logic is shared in base package
- Using two sperate builds ensures that there are no additional dependencies leaked between mobile and desktop variants

## Development

- Install dependencies with `yarn`
- Use `yarn dev:desktop` and `yarn dev:mobile`

## Deployment

- Build with `yarn build:desktop` and `yarn build:mobile`
- Deploy each app to a subdomain

## Configuration

- Add any common nuxt module and config to base ([base/nuxt.config](./packages/base/nuxt.config.js))
- Avoid adding mobile/desktop specific modules, plugins and css
  - Instead use [desktop/nuxt.config](./packages/desktop/nuxt.config.js) and [mobile/nuxt.config](./packages/mobile/nuxt.config.js)

## Pages / Layouts

Only [base/pages](./packages/base/pages) and [base/layouts](./packages/base/layouts)  directories are supported.

We use named components to implement them per-variant.

## Store

Only [base/store](./packages/base/store) directory is supported.

It is best to write shared logic inside vuex store modules.

## Styles

It is recommended to use scoped styles. But in case that need to use global styles,
they can be included in layout component or `nuxt.config` of each variant.

Also for component libraries, you can include their module in each variant.
