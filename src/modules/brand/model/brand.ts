import { z } from 'zod'
import { ModelStatus } from '~/share/model/base-model'
import { ErrBrandNameTooShort } from './errors'

export const modelName = 'brand'
// Define the Zod schema for the 'brands' table
export const BrandSchema = z.object({
  id: z.string().uuid(), // UUID v7 validation
  name: z.string().min(2, ErrBrandNameTooShort.message),
  image: z.string().nullable().optional(),
  tagLine: z.string().nullable().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ModelStatus),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable()
})

export type Brand = z.infer<typeof BrandSchema>
