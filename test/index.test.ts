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

it('matches snapshot', () => {
  expect(scrub(config)).toMatchSnapshot()
})
