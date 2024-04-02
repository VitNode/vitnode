import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { ShowPostsForums } from "@/plugins/forum/posts/show/dto/show.obj";
import { DeletePostsForumsArgs } from "@/plugins/forum/posts/delete/dto/delete.args";
import { DeleteForumsPostsService } from "@/plugins/forum/posts/delete/delete.service";
import { AuthGuards } from "@/utils/guards/auth.guard";

@Resolver()
export class DeleteForumPostsResolver {
  constructor(private readonly service: DeleteForumsPostsService) {}

  @Mutation(() => ShowPostsForums)
  @UseGuards(AuthGuards)
  async forum_posts__delete(
    @CurrentUser() user: User,
    @Args() args: DeletePostsForumsArgs
  ): Promise<string> {
    return await this.service.delete(user, args);
  }
}
