import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminFilesArgs } from './delete.dto';
import { DeleteAdminFilesService } from './delete.service';

@Resolver()
export class DeleteAdminFilesResolver {
  constructor(private readonly service: DeleteAdminFilesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_files__delete(
    @Args() args: DeleteAdminFilesArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
