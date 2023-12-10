import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowForumForumsService } from './show-forum_forums.service';
import { ShowForumForumsObj } from './dto/show.obj';
import { ShowForumForumsArgs } from './dto/show.args';

@Resolver()
export class ShowForumCategoriesResolver {
  constructor(private readonly service: ShowForumForumsService) {}

  @Query(() => ShowForumForumsObj)
  async show_forum_forums(@Args() args: ShowForumForumsArgs): Promise<ShowForumForumsObj> {
    return await this.service.show(args);
  }
}
