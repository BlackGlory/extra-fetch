import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { fetch } from '@src/fetch.js'
import { AbortController } from '@src/abort-controller.js'
import { getErrorPromise } from 'return-style'
import { getAddress, startService, stopService } from './utils.js'
import { buildServer } from './fetch.mock.js'

beforeEach(() => startService(buildServer))
afterEach(stopService)

describe('fetch', () => {
  test('general', async () => {
    const res = await fetch(getAddress())
    const result = await res.text()

    expect(result).toBe('OK')
  })

  test('AbortSignal', async () => {
    const controller = new AbortController()
    const customError = new Error()
    controller.abort(customError)

    const err = await getErrorPromise(fetch(getAddress(), {
      signal: controller.signal
    }))

    expect(err).toBe(customError)
  })
})
