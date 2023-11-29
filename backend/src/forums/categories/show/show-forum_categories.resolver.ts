import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowForumCategoriesService } from './show-forum_categories.service';
import { ShowForumCategoriesObj } from './dto/show-forum_categories.obj';
import { ShowForumCategoriesArgs } from './dto/show-forum_categories.args';

@Resolver()
export class ShowForumCategoriesResolver {
  constructor(private readonly service: ShowForumCategoriesService) {}

  @Query(() => ShowForumCategoriesObj)
  async show_forum_categories(
    @Args() args: ShowForumCategoriesArgs
  ): Promise<ShowForumCategoriesObj> {
    return await this.service.show(args);
  }
}
