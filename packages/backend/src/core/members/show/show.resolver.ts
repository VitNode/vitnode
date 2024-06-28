import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowCoreMembersService } from './show.service';
import { ShowCoreMembersObj } from './dto/show.obj';
import { ShowCoreMembersArgs } from './dto/show.args';

import { AuthGuards, OptionalAuth } from '@/utils';

@Resolver()
export class ShowCoreMembersResolver {
  constructor(private readonly service: ShowCoreMembersService) {}

  @Query(() => ShowCoreMembersObj)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async core_members__show(
    @Args() args: ShowCoreMembersArgs,
  ): Promise<ShowCoreMembersObj> {
    return this.service.show(args);
  }
}
