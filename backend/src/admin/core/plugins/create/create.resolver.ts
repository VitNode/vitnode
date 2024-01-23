import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateAdminPluginsService } from './create.service';
import { CreateAdminPluginsArgs } from './dto/create.args';
import { ShowAdminPlugins } from '../show/dto/show.obj';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class CreateAdminPluginsResolver {
  constructor(private readonly service: CreateAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  async core_plugins__admin__create(
    @Args() args: CreateAdminPluginsArgs
  ): Promise<ShowAdminPlugins> {
    return await this.service.create(args);
  }
}
