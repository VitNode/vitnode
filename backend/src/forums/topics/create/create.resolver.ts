import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateForumTopicsService } from './create.service';
import { CreateForumTopicsArgs } from './dto/create.args';
import { ShowTopicsForums } from '../show/dto/show.obj';

import { AuthGuards } from '@/utils/guards/auth.guards';
import { CurrentUser, User } from '@/utils/decorators/user.decorator';

@Resolver()
export class CreateForumTopicsResolver {
  constructor(private readonly service: CreateForumTopicsService) {}

  @Mutation(() => ShowTopicsForums)
  @UseGuards(AuthGuards)
  async forum_topics__create(
    @CurrentUser() user: User,
    @Args() args: CreateForumTopicsArgs
  ): Promise<ShowTopicsForums> {
    return await this.service.create(user, args);
  }
}
