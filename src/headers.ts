import { Headers as HeadersNode } from 'undici'

export const Headers = HeadersNode as typeof globalThis.Headers
