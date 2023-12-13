import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowForumForumsService } from './show.service';
import { ShowForumForumsObj } from './dto/show.obj';
import { ShowForumForumsArgs } from './dto/show.args';

@Resolver()
export class ShowForumForumsResolver {
  constructor(private readonly service: ShowForumForumsService) {}

  @Query(() => ShowForumForumsObj)
  async forum_forums__show(@Args() args: ShowForumForumsArgs): Promise<ShowForumForumsObj> {
    return await this.service.show(args);
  }
}
