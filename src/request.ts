import { Request as RequestNode } from 'undici'

export const Request = RequestNode as any as typeof globalThis.Request
