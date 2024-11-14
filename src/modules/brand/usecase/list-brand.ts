import { IQueryHandler, IQueryRepository } from '~/share/interface'
import { GetDetailQuery, ListQuery } from '../interfaces'
import { Brand } from '../model/brand'
import { BrandCondDTO, BrandUpdateDTO } from '../model/dto'
import { ErrDataNotFound } from '~/share/model/base-errors'

export class ListBrandQuery implements IQueryHandler<ListQuery, Brand[]> {
  constructor(private readonly repository: IQueryRepository<Brand, BrandCondDTO>) {}

  async query(query: ListQuery): Promise<Brand[]> {
    const collection = await this.repository.list(query.cond, query.paging)

    return collection
  }
}
