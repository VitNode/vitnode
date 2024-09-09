import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminPluginsService } from './delete.service';

@Resolver()
export class DeleteAdminPluginsResolver {
  constructor(private readonly service: DeleteAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__delete(
    @Args('code', { type: () => String }) code: string,
  ): Promise<string> {
    return this.service.delete({ code });
  }
}
