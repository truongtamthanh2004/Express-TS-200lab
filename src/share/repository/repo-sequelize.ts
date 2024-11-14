import { Sequelize } from 'sequelize'
import { IRepository } from '../interface'
import { PagingDTO } from '../model/paging'
import { Op } from 'sequelize'
import { ModelStatus } from '../model/base-model'

export abstract class BaseRepositorySequelize<Entity, Cond, UpdateDTO> implements IRepository<Entity, Cond, UpdateDTO> {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}

  async get(id: string): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName].findByPk(id)

    if (!data) return null
    // return CategorySchema.parse({
    //   ...data.get({ plain: true }),
    //   parentId: data.getDataValue('parent_id'),
    //   createdAt: data.getDataValue('created_at'),
    //   updatedAt: data.getDataValue('updated_at'),
    //   children: []
    // }) as Category

    return {
      ...data.get({ plain: true }),
      createdAt: data.getDataValue('created_at'),
      updatedAt: data.getDataValue('updated_at')
    } as Entity
  }

  async list(cond: Cond, paging: PagingDTO): Promise<Array<Entity>> {
    const { page, limit } = paging

    const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } }

    const total = await this.sequelize.models[this.modelName].count({ where: condSQL })
    paging.total = total

    const rows = await this.sequelize.models[this.modelName].findAll({
      where: condSQL,
      limit,
      offset: (page - 1) * limit
    })

    return rows.map((row) => row.get({ plain: true }))
  }

  async findByCond(cond: Cond): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName].findOne({ where: cond as any })

    if (!data) return null

    return data.get({ plain: true }) as Entity
  }

  async insert(data: Entity): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data as any)
    return true
  }

  async update(id: string, data: UpdateDTO): Promise<boolean> {
    // Không cần check có tồn tại hay không vì usecase làm
    await this.sequelize.models[this.modelName].update(data as any, { where: { id } })
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
