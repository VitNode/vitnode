import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminPluginsArgs } from './delete.dto';
import { DeleteAdminPluginsService } from './delete.service';

@Resolver()
export class DeleteAdminPluginsResolver {
  constructor(private readonly service: DeleteAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__delete(
    @Args() args: DeleteAdminPluginsArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
