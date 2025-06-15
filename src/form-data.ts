import { FormData as undiciFormData } from 'undici'

export const FormData = undiciFormData as unknown as globalThis.FormData
