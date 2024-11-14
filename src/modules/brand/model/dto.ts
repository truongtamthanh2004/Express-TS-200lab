import { z } from 'zod'
import { ModelStatus } from '~/share/model/base-model'
import { ErrBrandNameTooShort } from './errors'

// Define the Zod schema for the 'brands' table
export const BrandCreateDTOSchema = z.object({
  id: z.string().uuid().optional(), // UUID v7 validation
  name: z.string().min(2, ErrBrandNameTooShort.message),
  image: z.string().nullable().optional(),
  tagLine: z.string().nullable().optional(),
  description: z.string().optional()
})

export type BrandCreateDTO = z.infer<typeof BrandCreateDTOSchema>

export const BrandUpdateDTOSchema = z.object({
  name: z.string().min(2, ErrBrandNameTooShort.message),
  image: z.string().nullable().optional(),
  tagLine: z.string().nullable().optional(),
  description: z.string().optional()
})

export type BrandUpdateDTO = z.infer<typeof BrandUpdateDTOSchema>

export type BrandCondDTO = {}
