import { Headers as HeadersNode } from 'node-fetch'

export const Headers = HeadersNode as typeof globalThis.Headers
