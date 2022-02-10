import { Blob as NodeBlob } from 'node:buffer'

export const Blob = NodeBlob as typeof globalThis.Blob
