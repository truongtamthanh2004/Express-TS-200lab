import { Sequelize } from 'sequelize'
import { Brand } from '~/modules/brand/model/brand'
import { BrandCondDTO, BrandUpdateDTO } from '~/modules/brand/model/dto'
import { BaseRepositorySequelize } from '~/share/repository/repo-sequelize'
import { modelName } from './dto'

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName)
  }
}
