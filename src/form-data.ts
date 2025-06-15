import { FormData as undiciFormData } from 'undici'

export const FormData = undiciFormData as typeof globalThis.FormData
