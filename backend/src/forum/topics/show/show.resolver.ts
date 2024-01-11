import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowTopicsForumsService } from './show.service';
import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { AuthGuards, OptionalAuth } from '@/utils/guards/auth.guards';
import { CurrentUser, User } from '../../../../utils/decorators/user.decorator';

@Resolver()
export class ShowTopicsForumsResolver {
  constructor(private readonly service: ShowTopicsForumsService) {}

  @Query(() => ShowTopicsForumsObj)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async forum_topics__show(
    @Args() args: ShowTopicsForumsArgs,
    @CurrentUser() user?: User
  ): Promise<ShowTopicsForumsObj> {
    return await this.service.show(args, user);
  }
}
