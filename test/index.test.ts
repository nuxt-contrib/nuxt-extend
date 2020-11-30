import { resolve } from 'path'
import { resolveConfig } from '../src'
import config from './fixture/app/nuxt.config'

const scrub = (input) => {
  if (typeof input === 'string') {
    return input.replace(__dirname, '{test}')
  }

  if (Array.isArray(input)) {
    return input.map(i => scrub(i))
  }

  if (typeof input === 'object') {
    const res = {}
    for (const key in input) {
      res[key] = scrub(input[key])
    }
    return res
  }

  return input
}

it('fails on config being a function', () => {
  const config = () => ({})
  expect(() => resolveConfig(config))
    .toThrow('extending is not possible with nuxt config as a function')
})

it('matches snapshot', () => {
  expect(scrub(config)).toMatchSnapshot()
})
