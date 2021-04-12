import { Response as ResponseNode } from 'node-fetch'

export const Response = ResponseNode as any as typeof globalThis.Response
