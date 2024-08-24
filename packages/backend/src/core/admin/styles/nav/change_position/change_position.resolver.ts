import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePositionAdminNavStylesService } from './change_position.service';
import { ChangePositionAdminNavStylesArgs } from './dto/change_position.args';

@Resolver()
export class ChangePositionAdminNavStylesResolver {
  constructor(private readonly service: ChangePositionAdminNavStylesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav_styles__change_position(
    @Args() args: ChangePositionAdminNavStylesArgs,
  ): Promise<string> {
    return this.service.changePosition(args);
  }
}
