import { IQueryHandler, IQueryRepository } from '~/share/interface'
import { GetDetailQuery } from '../interfaces'
import { Brand } from '../model/brand'
import { BrandCondDTO, BrandUpdateDTO } from '../model/dto'
import { ErrDataNotFound } from '~/share/model/base-errors'

export class GetBrandDetailQuery implements IQueryHandler<GetDetailQuery, Brand> {
  constructor(private readonly repository: IQueryRepository<Brand, BrandCondDTO>) {}

  async query(query: GetDetailQuery): Promise<Brand> {
    const data = await this.repository.get(query.id)

    if (!data) {
      throw ErrDataNotFound
    }

    return data
  }
}
