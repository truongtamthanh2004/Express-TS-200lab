import { PagingDTO, PagingDTOSchema } from './../../../../share/model/paging'
import { Request, Response } from 'express'
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO, BrandUpdateDTOSchema } from '../../model/dto'
import {
  CreateCommand,
  DeleteCommand,
  GetDetailQuery,
  IBrandRepository,
  IBrandUseCase,
  ListQuery,
  UpdateCommand
} from '../../interfaces'
import { Brand } from '../../model/brand'
import { ICommandHandler, IQueryHandler, IRepository } from '~/share/interface'

export class BrandHttpService {
  constructor(
    private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
    private readonly getDetailQueryHandler: IQueryHandler<GetDetailQuery, Brand>,
    private readonly updateCmdHandler: ICommandHandler<UpdateCommand, void>,
    private readonly deleteCmdHandler: ICommandHandler<DeleteCommand, void>,
    private readonly listQueryHandler: IQueryHandler<ListQuery, Brand[]>
  ) {}

  async createAPI(req: Request, res: Response) {
    try {
      const cmd: CreateCommand = { cmd: req.body }
      const result = await this.createCmdHandler.execute(cmd)

      res.status(201).json({ data: result })
    } catch (error) {
      console.error('Error creating brand:', error)
      res.status(500).json({ data: 'Internal Server Error' })
    }
  }

  async getDetailAPI(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await this.getDetailQueryHandler.query({ id })

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

  async updateAPI(req: Request, res: Response) {
    const { id } = req.params

    const cmd: UpdateCommand = { id, dto: req.body }

    await this.updateCmdHandler.execute(cmd)
    res.status(200).json({ data: true })
  }

  async deleteAPI(req: Request, res: Response) {
    const { id } = req.params

    const cmd: DeleteCommand = { id, isHardDelete: false }
    try {
      await this.deleteCmdHandler.execute(cmd)

      res.status(200).json({ data: true })
    } catch (error) {
      console.error('Error deleting brand:', error)
      res.status(400).json({ data: 'Data not found' })
    }
  }

  async listAPI(req: Request, res: Response) {
    const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query)

    if (!success) {
      res.status(400).json({ message: 'Invalid paging', error: error.message })
      return
    }

    // const paging = {
    //   page: 1,
    //   limit: 200
    // }

    // const cond = await BrandCondDTO.parse(req.query)
    const result = await this.listQueryHandler.query({ cond: {}, paging })

    // const categoriesTree = this.buildTree(result)

    res.status(200).json({ data: result, paging, filter: {} })
  }
}
