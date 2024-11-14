import { ModelStatus } from '~/share/model/base-model'
import { CreateCommand, DeleteCommand, IBrandRepository, UpdateCommand } from '../interfaces'
import { BrandCreateDTOSchema, BrandUpdateDTOSchema } from '../model/dto'
import { ErrBrandNameDuplicate } from '../model/errors'
import { v7 } from 'uuid'
import { ICommandHandler } from '~/share/interface'
import { ErrDataNotFound } from '~/share/model/base-errors'

export class DeleteBrandCmdHandler implements ICommandHandler<DeleteCommand, void> {
  constructor(private readonly repository: IBrandRepository) {}

  async execute(command: DeleteCommand): Promise<void> {
    const category = await this.repository.get(command.id)

    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound
    }

    await this.repository.delete(command.id, command.isHardDelete)

    return
  }
}
