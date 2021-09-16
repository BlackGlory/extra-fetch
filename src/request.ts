import { Request as RequestNode } from '@blackglory/node-fetch'

export const Request = RequestNode as any as typeof globalThis.Request
