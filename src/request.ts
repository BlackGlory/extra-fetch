import { Request as RequestNode } from 'node-fetch'

export const Request = RequestNode as any as typeof globalThis.Request
