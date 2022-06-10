import { fastify } from 'fastify'

export function buildServer() {
  const server = fastify()

  server.get('/', async (req, res) => {
    return { method: 'GET' }
  })

  server.delete('/', async (req, res) => {
    return { method: 'DELETE' }
  })

  return server
}
