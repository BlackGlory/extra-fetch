import { Headers as HeadersNode } from 'node-fetch'

export const Headers = HeadersNode as any as typeof globalThis.Headers
