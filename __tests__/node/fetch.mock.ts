import { fastify } from 'fastify'

export function buildServer() {
  const server = fastify({
    keepAliveTimeout: 1000 // 因为设置为0和undefined都没用, 所以设置成1秒
  })

  server.get('/', (req, reply) => {
    reply.send('OK')
  })

  return server
}
