import { server } from './fetch.mock'
import { fetch } from '@src/fetch'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetch', () => {
  describe('without options', () => {
    it('works fine', async () => {
      const result = fetch('http://localhost')
      const proResult = await result.then(res => res.json())

      expect(result).toBePromise()
      expect(proResult).toMatchObject({
        method: 'GET'
      })
    })
  })

  describe('with options', () => {
    it('works fine', async () => {
      const result = fetch('http://localhost', { method: 'DELETE' })
      const proResult = await result.then(res => res.json())

      expect(result).toBePromise()
      expect(proResult).toMatchObject({
        method: 'DELETE'
      })
    })
  })
})
