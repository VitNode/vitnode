import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateForumForumsService } from './create.service';
import { CreateForumForumsArgs } from './dto/create-forum_forums.args';

import { ShowForumForumsWithParent } from '../../../../forums/forums/show/dto/show-forum_forums.obj';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class CreateForumCategoriesResolver {
  constructor(private readonly service: CreateForumForumsService) {}

  @Mutation(() => ShowForumForumsWithParent)
  @UseGuards(AdminAuthGuards)
  async forum_forums__admin__create(
    @Args() args: CreateForumForumsArgs
  ): Promise<ShowForumForumsWithParent> {
    return await this.service.create(args);
  }
}
