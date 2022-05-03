import { FormData as NodeFormData } from '@blackglory/node-fetch'

export const FormData = NodeFormData as typeof globalThis.FormData
