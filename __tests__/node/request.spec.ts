import { Request } from '@src/request'

describe('Request', () => {
  describe('keepalive', () => {
    test('default', () => {
      const req = new Request('http://localhost')

      expect(req.keepalive).toBe(false)
    })

    test('set', () => {
      const req = new Request('http://localhost', { keepalive: true })

      expect(req.keepalive).toBe(true)
    })
  })
})
