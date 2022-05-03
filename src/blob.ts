import { Blob as NodeBlob } from '@blackglory/node-fetch'

export const Blob = NodeBlob as typeof globalThis.Blob
