import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminPlugins } from '../show/show.dto';
import { EditAdminPluginsArgs } from './edit.dto';
import { EditAdminPluginsService } from './edit.service';

@Resolver()
export class EditAdminPluginsResolver {
  constructor(private readonly service: EditAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__edit(
    @Args() args: EditAdminPluginsArgs,
  ): Promise<ShowAdminPlugins> {
    return this.service.edit(args);
  }
}
