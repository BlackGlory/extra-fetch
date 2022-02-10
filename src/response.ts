import { Response as ResponseNode } from 'undici'

export const Response = ResponseNode as any as typeof globalThis.Response
