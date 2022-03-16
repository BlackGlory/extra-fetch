import { fetch } from '@src/fetch'
import { AbortController } from '@src/abort-controller'
import { getErrorPromise } from 'return-style'
import { getAddress, startService, stopService } from './utils'
import { buildServer } from './fetch.mock'
import '@blackglory/jest-matchers'

beforeEach(() => startService(buildServer))
afterEach(stopService)

describe('fetch', () => {
  describe('without options', () => {
    it('works fine', async () => {
      const result = fetch(getAddress())
      const proResult = await result.then(res => res.json())

      expect(proResult).toMatchObject({
        method: 'GET'
      })
    })
  })

  describe('with options', () => {
    it('works fine', async () => {
      const result = fetch(getAddress(), { method: 'DELETE' })
      const proResult = await result.then(res => res.json())

      expect(proResult).toMatchObject({
        method: 'DELETE'
      })
    })
  })

  describe('AbortSignal', () => {
    it('throw AbortError', async () => {
      const controller = new AbortController()
      controller.abort()

      const err = await getErrorPromise(fetch(getAddress(), {
        signal: controller.signal
      }))

      expect(err?.name).toBe('AbortError')
    })
  })
})
