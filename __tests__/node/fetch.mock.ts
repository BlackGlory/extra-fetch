import { fastify } from 'fastify'

export function buildServer() {
  const server = fastify()

  server.get('/', async (req, reply) => {
    reply.send({ method: 'GET' })
  })

  server.delete('/', async (req, reply) => {
    reply.send({ method: 'DELETE' })
  })

  return server
}
