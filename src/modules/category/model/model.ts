import { z } from 'zod'
import { ModelStatus } from '~/share/model/base-model'

export enum CategoryStatus {
  Active = 'active',
  Inactive = 'inactive',
  DELETED = 'deleted'
}

// type CategoryCreateDTO = {
//   name: string
//   image?: string
//   description?: string
//   parentId?: string
//   status: CategoryStatus
// }

// type Category = {
//   id: string // uuid v7
//   name: string
//   image?: string | null
//   description?: string | null
//   position?: number | null
//   parentId?: string | null
//   status: CategoryStatus
//   createdAt: Date
//   updatedAt: Date
// }

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, 'name must be at least 3 characters'),
  image: z.string().nullable().optional(),
  description: z.string().optional(),
  position: z.number().min(0, 'invalid position').default(0).nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  status: z.nativeEnum(ModelStatus),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable()
})

export type Category = z.infer<typeof CategorySchema>
