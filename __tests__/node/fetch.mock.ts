import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(req)
    )
  })

, rest.delete('/', (req, res, ctx) => {
    return res(
      ctx.status(200)
    , ctx.json(req)
    )
  })
)
