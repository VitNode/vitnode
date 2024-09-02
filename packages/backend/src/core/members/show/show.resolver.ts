import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { AuthGuards, OptionalAuth } from '../../../utils';
import { ShowCoreMembersArgs, ShowCoreMembersObj } from './show.dto';
import { ShowCoreMembersService } from './show.service';

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
