import { AbortController as AbortControllerNode } from 'abort-controller'

export const AbortController = AbortControllerNode as typeof globalThis.AbortController
