import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateForumForumsService } from './create-forum_forums.service';
import { CreateForumForumsArgs } from './dto/create-forum_forums.args';
import { ShowForumForumsWithParent } from '../show/dto/show-forum_forums.obj';

@Resolver()
export class CreateForumCategoriesResolver {
  constructor(private readonly service: CreateForumForumsService) {}

  @Mutation(() => ShowForumForumsWithParent)
  async create_forum_forums(
    @Args() args: CreateForumForumsArgs
  ): Promise<ShowForumForumsWithParent> {
    return await this.service.create(args);
  }
}
