import { FormData as NodeFormData } from 'node-fetch'

export const FormData = NodeFormData as typeof globalThis.FormData
