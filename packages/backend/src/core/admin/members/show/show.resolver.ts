import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminMembersArgs, ShowAdminMembersObj } from './show.dto';
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
