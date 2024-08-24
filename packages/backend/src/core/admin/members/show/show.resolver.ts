import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminMembersArgs } from './dto/show.args';
import { ShowAdminMembersObj } from './dto/show.obj';
import { ShowAdminMembersService } from './show.service';

@Resolver()
export class ShowAdminMembersResolver {
  constructor(private readonly service: ShowAdminMembersService) {}

  @Query(() => ShowAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__show(
    @Args() args: ShowAdminMembersArgs,
  ): Promise<ShowAdminMembersObj> {
    return this.service.show(args);
  }
}
