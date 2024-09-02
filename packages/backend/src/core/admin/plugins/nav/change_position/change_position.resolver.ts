import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePositionAdminNavPluginsArgs } from './change_position.dto';
import { ChangePositionAdminNavPluginsService } from './change_position.service';

@Resolver()
export class ChangePositionAdminNavPluginsResolver {
  constructor(private readonly service: ChangePositionAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__change_position(
    @Args() args: ChangePositionAdminNavPluginsArgs,
  ): string {
    return this.service.changePosition(args);
  }
}
