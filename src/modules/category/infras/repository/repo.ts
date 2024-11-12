import { modelName } from './dto'
import { sequelize } from './../../../../share/component/sequelize'
import { PagingDTO } from '~/share/model/paging'
import { IRepository } from '../../interfaces'
import { CategoryCondDTO, CategoryUpdateDTO } from '../../model/dto'
import { Category, CategorySchema } from '../../model/model'
import { Sequelize } from 'sequelize'
import { ModelStatus } from '~/share/model/base-model'
import { Op } from 'sequelize'

export class MySQLCategoryRepository implements IRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}

  async get(id: string): Promise<Category | null> {
    const data = await this.sequelize.models[this.modelName].findByPk(id)

    if (!data) return null
    return CategorySchema.parse({
      ...data.get({ plain: true }),
      parentId: data.getDataValue('parent_id'),
      createdAt: data.getDataValue('created_at'),
      updatedAt: data.getDataValue('updated_at')
    })
  }

  async list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>> {
    const { page, limit } = paging

    const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } }

    const total = await this.sequelize.models[this.modelName].count({ where: condSQL })
    paging.total = total

    const rows = await this.sequelize.models[this.modelName].findAll({
      where: condSQL,
      limit,
      offset: (page - 1) * limit
    })

    return rows.map((row) =>
      CategorySchema.parse({
        ...row.get({ plain: true }),
        parentId: row.getDataValue('parent_id'),
        createdAt: row.getDataValue('created_at'),
        updatedAt: row.getDataValue('updated_at')
      })
    )
  }

  async insert(data: Category): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data)
    return true
  }

  async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    // Không cần check có tồn tại hay không vì usecase làm
    await this.sequelize.models[this.modelName].update(data, { where: { id } })
    return true
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (isHard) {
      await this.sequelize.models[this.modelName].destroy({ where: { id } })
      return true
    }

    await this.sequelize.models[this.modelName].update({ status: ModelStatus.DELETED }, { where: { id } })
    return true
  }
}
