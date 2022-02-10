import { FormData as NodeFormData } from 'undici'

export const FormData = NodeFormData as typeof globalThis.FormData
