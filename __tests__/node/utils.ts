import Hapi from '@hapi/hapi'

const server = Hapi.server()

server.route({
  method: 'GET'
, path: '/'
, handler(request, h) {
    return { method: 'GET' }
  }
})

server.route({
  method: 'DELETE'
, path: '/'
, handler(request, h) {
    return { method: 'DELETE' }
  }
})

export async function startService(): Promise<string> {
  await server.start()
  return server.info.uri
}

export async function stopService(): Promise<void> {
  await server.stop()
}
