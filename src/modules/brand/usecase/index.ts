import { IRepository } from '~/share/interface'
import { Brand } from '../model/brand'
import { BrandCondDTO, BrandCreateDTO, BrandCreateDTOSchema, BrandUpdateDTO } from '../model/dto'
import { IBrandUseCase } from './../interfaces/index'
import { ModelStatus } from '~/share/model/base-model'
import { v7 } from 'uuid'
import { PagingDTO } from '~/share/model/paging'
import { ErrBrandNameDuplicate } from '../model/errors'

export class BrandUseCase implements IBrandUseCase {
  constructor(private readonly repository: IRepository<Brand, BrandCondDTO, BrandUpdateDTO>) {}

  async create(data: BrandCreateDTO): Promise<string> {
    const { success, data: parsedData, error } = BrandCreateDTOSchema.safeParse(data)

    if (!success) {
      throw new Error(error.errors[0].message)
    }

    const isExist = await this.repository.findByCond({ name: parsedData.name })

    if (isExist) {
      throw ErrBrandNameDuplicate
    }

    const newId = v7()

    const newBrand = {
      ...parsedData,
      id: newId,
      status: ModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.repository.insert(newBrand)

    return newId
  }
  async get(id: string): Promise<Brand | null> {
    return this.repository.get(id)
  }
  async list(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>> {
    return this.repository.list(cond, paging)
  }
  async update(id: string, data: BrandUpdateDTO): Promise<boolean> {
    return this.repository.update(id, data)
  }
  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id, false)
  }
}
