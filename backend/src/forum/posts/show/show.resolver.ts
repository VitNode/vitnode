import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowPostsForumsService } from './show.service';
import { ShowPostsForumsObj } from './dto/show.obj';
import { ShowPostsForumsArgs } from './dto/show.args';

@Resolver()
export class ShowPostsForumsResolver {
  constructor(private readonly service: ShowPostsForumsService) {}

  @Query(() => ShowPostsForumsObj)
  async forum_posts__show(@Args() args: ShowPostsForumsArgs): Promise<ShowPostsForumsObj> {
    return await this.service.show(args);
  }
}
