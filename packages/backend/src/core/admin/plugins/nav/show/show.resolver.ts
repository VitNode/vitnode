import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminNavPluginsArgs, ShowAdminNavPluginsObj } from './show.dto';
import { ShowAdminNavPluginsService } from './show.service';

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
