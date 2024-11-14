import { ModelStatus } from '~/share/model/base-model'
import { CreateCommand, IBrandRepository, UpdateCommand } from '../interfaces'
import { BrandCreateDTOSchema, BrandUpdateDTOSchema } from '../model/dto'
import { ErrBrandNameDuplicate } from '../model/errors'
import { v7 } from 'uuid'
import { ICommandHandler } from '~/share/interface'
import { ErrDataNotFound } from '~/share/model/base-errors'

export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommand, void> {
  constructor(private readonly repository: IBrandRepository) {}

  async execute(command: UpdateCommand): Promise<void> {
    const category = await this.repository.get(command.id)

    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound
    }

    const { success, data: parsedData, error } = BrandUpdateDTOSchema.safeParse(command.dto)

    await this.repository.update(command.id, parsedData as any)

    return
  }
}
