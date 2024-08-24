import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminPlugins } from '../show/dto/show.obj';
import { CreateAdminPluginsService } from './create.service';
import { CreateAdminPluginsArgs } from './dto/create.args';

@Resolver()
export class CreateAdminPluginsResolver {
  constructor(private readonly service: CreateAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__create(
    @Args() args: CreateAdminPluginsArgs,
  ): Promise<ShowAdminPlugins> {
    return this.service.create(args);
  }
}
