import { Response as ResponseNode } from '@blackglory/node-fetch'

export const Response = ResponseNode as any as typeof globalThis.Response
