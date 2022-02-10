import { AddressInfo } from 'net'
import { serve } from 'micri'

const server = serve(async (req, res) => {
  if (req.method === 'GET') {
    return { method: 'GET' }
  } else if (req.method === 'DELETE') {
    return { method: 'DELETE' }
  }
})

export function startService(): Promise<string> {
  return new Promise<string>((resolve, reject) => server.listen(() => {
    const addressInfo = server.address() as AddressInfo
    const url = new URL('http://localhost')
    url.host = addressInfo.address
    url.port = addressInfo.port.toString()
    resolve(url.toString())
  }))
}

export function stopService(): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
