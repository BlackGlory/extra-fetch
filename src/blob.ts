import { Blob as NodeBlob } from 'node-fetch'

export const Blob = NodeBlob as typeof globalThis.Blob
