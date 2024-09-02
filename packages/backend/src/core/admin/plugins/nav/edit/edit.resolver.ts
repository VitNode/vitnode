import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminNavPluginsObj } from '../show/show.dto';
import { EditCreateAdminNavPluginsArgs } from './edit.dto';
import { EditAdminNavPluginsService } from './edit.service';

@Resolver()
export class EditAdminNavPluginsResolver {
  constructor(private readonly service: EditAdminNavPluginsService) {}

  @Mutation(() => ShowAdminNavPluginsObj)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__edit(
    @Args() args: EditCreateAdminNavPluginsArgs,
  ): ShowAdminNavPluginsObj {
    return this.service.edit(args);
  }
}
