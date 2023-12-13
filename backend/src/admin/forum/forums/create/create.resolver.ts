import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateForumForumsService } from './create.service';
import { CreateForumForumsArgs } from './dto/create.args';

import { ShowForumForumsWithParent } from '../../../../forums/forums/show/dto/show.obj';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class CreateForumForumsResolver {
  constructor(private readonly service: CreateForumForumsService) {}

  @Mutation(() => ShowForumForumsWithParent)
  @UseGuards(AdminAuthGuards)
  async forum_forums__admin__create(
    @Args() args: CreateForumForumsArgs
  ): Promise<ShowForumForumsWithParent> {
    return await this.service.create(args);
  }
}
