import { PagingDTO, PagingDTOSchema } from './../../../../share/model/paging'
import { Request, Response } from 'express'
import { CategoryUseCase } from '../../usecase'
import { CategoryCondDTOSchema, CategoryCreateSchema, CategoryUpdateSchema } from '../../model/dto'
import { ICategoryUseCase } from '../../interfaces'

export class CategoryHttpService {
  constructor(private readonly useCase: ICategoryUseCase) {}

  async createANewCategoryAPI(req: Request, res: Response) {
    try {
      const { success, data, error } = CategoryCreateSchema.safeParse(req.body)

      if (!success) {
        res.status(400).json({ message: 'Invalid request', error })
        return
      }

      const result = await this.useCase.createANewCategory(data)
      res.status(201).json({ id: result })
    } catch (error) {
      res.status(500).json({ data: 'Internal Server Error' })
    }
  }

  async getDetailCategoryAPI(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await this.useCase.getDetailCategory(id)

      if (!result) {
        res.status(404).json({ message: 'Not found' })
        return
      }

      res.status(200).json({ data: result })
    } catch (error) {
      console.error('Error fetching category:', error)
      res.status(500).json({ data: 'Internal Server Error' })
    }
  }

  async updateCategoryAPI(req: Request, res: Response) {
    const { id } = req.params
    const { success, data, error } = CategoryUpdateSchema.safeParse(req.body)

    if (!success) {
      res.status(400).json({ message: 'Invalid request', error })
      return
    }

    const result = await this.useCase.updateCategory(id, data)
    res.status(200).json({ data: result })
  }

  async deleteCategoryAPI(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.useCase.deleteCategory(id)

    res.status(200).json({ data: result })
  }

  async listCategoriesAPI(req: Request, res: Response) {
    const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query)

    if (!success) {
      res.status(400).json({ message: 'Invalid request', error })
      return
    }

    const cond = await CategoryCondDTOSchema.parse(req.query)

    console.log(cond)

    const result = await this.useCase.listCategories(cond, paging)
    res.status(200).json({ data: result, paging, filter: cond })
  }
}
