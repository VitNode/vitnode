import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuards } from "@/src/utils/guards/auth.guards";
import { CurrentUser, User } from "@/src/utils/decorators/user.decorator";
import { Ctx } from "@/src/types/context.type";
import { CreatePostsForumsArgs } from "@/src/modules/forum/posts/create/dto/create.args";
import { ShowPostsForums } from "@/src/modules/forum/posts/show/dto/show.obj";
import { CreateForumsPostsService } from "@/src/modules/forum/posts/create/create.service";

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
    return await this.service.create(user, args, context);
  }
}
