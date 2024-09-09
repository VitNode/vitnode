import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminFilesService } from './delete.service';

@Resolver()
export class DeleteAdminFilesResolver {
  constructor(private readonly service: DeleteAdminFilesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_files__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
