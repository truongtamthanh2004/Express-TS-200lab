// import { CategoryCondDTOSchema } from './dto'
import { z } from 'zod'
import { CategoryStatus } from './model'
import { ModelStatus } from '~/share/model/base-model'

export const CategoryCreateSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  image: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().uuid().nullable().optional()
})

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>

// export type CategoryUpdateDTO = {
//   name: string
//   image?: string
//   description?: string
//   parentId?: string
//   status?: CategoryStatus
// }

export const CategoryUpdateSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  image: z.string().optional(),
  description: z.string().optional(),
  position: z.number().min(0, 'invalid position').nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  status: z.nativeEnum(ModelStatus).optional()
})

// Define the TypeScript type using the Zod schema
export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>

export const CategoryCondDTOSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters').optional(),
  parentId: z.string().uuid().optional(),
  status: z.nativeEnum(ModelStatus).optional()
})

export type CategoryCondDTO = z.infer<typeof CategoryCondDTOSchema>
