import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.get('http://localhost', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(req)
    )
  })

, rest.delete('http://localhost', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(req)
    )
  })
)
