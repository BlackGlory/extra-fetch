import BlobNode = require('fetch-blob')

export const Blob = BlobNode as any as typeof globalThis.Blob
