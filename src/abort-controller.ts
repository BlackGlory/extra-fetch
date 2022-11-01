import * as ExtraAbort from 'extra-abort'

export const AbortController = globalThis.AbortController ?? ExtraAbort.AbortController as typeof globalThis.AbortController
