import fastify from 'fastify'

let server: ReturnType<typeof buildServer>
let address: string

export async function startService(): Promise<void> {
  server = buildServer()
  address = await server.listen(0)
}

export async function stopService(): Promise<void> {
  await server.close()
}

export function getAddress(): string {
  return address
}

function buildServer() {
  const server = fastify()

  server.get('/', async (req, res) => {
    return { method: 'GET' }
  })

  server.delete('/', async (req, res) => {
    return { method: 'DELETE' }
  })

  return server
}
