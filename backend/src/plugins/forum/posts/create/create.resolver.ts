import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuards } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { CreatePostsForumsArgs } from "@/plugins/forum/posts/create/dto/create.args";
import { ShowPostsForums } from "@/plugins/forum/posts/show/dto/show.obj";
import { CreateForumsPostsService } from "@/plugins/forum/posts/create/create.service";
import { Ctx } from "@/utils/types/context.type";

@Resolver()
export class CreateForumPostsResolver {
  constructor(private readonly service: CreateForumsPostsService) {}

  @Mutation(() => ShowPostsForums)
  @UseGuards(AuthGuards)
  async forum_posts__create(
    @CurrentUser() user: User,
    @Args() args: CreatePostsForumsArgs,
    @Context() context: Ctx
  ): Promise<ShowPostsForums> {
    return this.service.create(user, args, context);
  }
}
