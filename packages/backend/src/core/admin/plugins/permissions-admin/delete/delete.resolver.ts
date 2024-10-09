import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminPermissionsAdminPluginsArgs } from './delete.dto';
import { DeleteAdminPermissionsAdminPluginsService } from './delete.service';

@Resolver()
export class DeleteAdminPermissionsAdminPluginsResolver {
  constructor(
    private readonly service: DeleteAdminPermissionsAdminPluginsService,
  ) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__permissions_admin__delete(
    @Args() args: DeleteAdminPermissionsAdminPluginsArgs,
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
