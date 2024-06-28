import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminNavPluginsArgs } from './dto/show.args';
import { ShowAdminNavPluginsService } from './show.service';
import { ShowAdminNavPluginsObj } from './dto/show.obj';

import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';

@Resolver()
export class ShowAdminNavPluginsResolver {
  constructor(private readonly service: ShowAdminNavPluginsService) {}

  @Query(() => [ShowAdminNavPluginsObj])
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__show(
    @Args() args: ShowAdminNavPluginsArgs,
  ): ShowAdminNavPluginsObj[] {
    return this.service.show(args);
  }
}
