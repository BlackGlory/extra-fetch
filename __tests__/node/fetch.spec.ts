import { fetch } from '@src/fetch.js'
import { AbortController } from '@src/abort-controller.js'
import { getErrorPromise } from 'return-style'
import { getAddress, startService, stopService } from './utils.js'
import { buildServer } from './fetch.mock.js'
import '@blackglory/jest-matchers'

beforeEach(() => startService(buildServer))
afterEach(stopService)

describe('fetch', () => {
  describe('without options', () => {
    it('works fine', async () => {
      const result = fetch(getAddress())
      const proResult = await result.then(res => res.json())

      expect(proResult).toStrictEqual({ method: 'GET' })
    })
  })

  describe('with options', () => {
    it('works fine', async () => {
      const result = fetch(getAddress(), { method: 'DELETE' })
      const proResult = await result.then(res => res.json())

      expect(proResult).toStrictEqual({ method: 'DELETE' })
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
