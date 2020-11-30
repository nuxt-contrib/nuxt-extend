# Extend example

This example is using `nuxt-extend` and [nuxt components](https://nuxtjs.org/docs/2.x/features/nuxt-components)
to create a multi-variant mobile/desktop nuxt application.

- Using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces) for mono-repo managenment
- Most of the logic is shared in base package
- Using two sperate builds ensures that there are no additional dependencies leaked between mobile and desktop variants

## Configuration

- Add any common nuxt module and config to base ([base/nuxt.config](./packages/base/nuxt.config.js))
- Avoid adding mobile/desktop specific modules, plugins and css
  - Instead use [desktop/nuxt.config](./packages/desktop/nuxt.config.js) and [mobile/nuxt.config](./packages/mobile/nuxt.config.js)

## Pages

Only top-level `pages/` directory is supported. It is best to always use a named component and implement per-variant.

## Store

Only top-level `store/` directory is supported. It is best to write shared logic inside vuex store modules.

## Layout

Using named components, it can be implemented with `components/AppLayout.vue` per-variant.

## Styles

It is recommended to use scoped styles. But in case that need to use global styles,
they can be included in layout component or `nuxt.config` of each variant.
