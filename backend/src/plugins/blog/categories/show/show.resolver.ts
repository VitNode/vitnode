import { Args, Query, Resolver } from "@nestjs/graphql";

import { ShowBlogCategoriesService } from "./show.service";
import { ShowBlogCategoriesArgs } from "./dto/show.args";
import { ShowBlogCategoriesObj } from "./dto/show.obj";

@Resolver()
export class ShowBlogCategoriesResolver {
  constructor(private readonly service: ShowBlogCategoriesService) {}

  @Query(() => ShowBlogCategoriesObj)
  async blog_categories__show(
    @Args() args: ShowBlogCategoriesArgs
  ): Promise<ShowBlogCategoriesObj> {
    return await this.service.show(args);
  }
}
