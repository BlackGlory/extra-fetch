import NodeAbortController from 'extra-abort'

export const AbortController = globalThis.AbortController ?? NodeAbortController as typeof globalThis.AbortController
