import { IRepository } from '~/share/interface'
import { Brand } from '../model/brand'
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from '../model/dto'
import { PagingDTO } from './../../../share/model/paging'

export interface IBrandUseCase {
  create(data: BrandCreateDTO): Promise<string>
  get(id: string): Promise<Brand | null>
  list(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>>
  update(id: string, data: BrandUpdateDTO): Promise<boolean>
  delete(id: string): Promise<boolean>
}

export interface CreateCommand {
  cmd: BrandCreateDTO
}

export interface GetDetailQuery {
  id: string
}

export interface UpdateCommand {
  id: string
  dto: BrandUpdateDTO
}

export interface DeleteCommand {
  id: string
  isHardDelete: boolean
}

export interface ListQuery {
  cond: BrandCondDTO
  paging: PagingDTO
}

export interface IBrandRepository extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> {}
