import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuards } from "@/utils/guards/auth.guards";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { DeletePostsForumsArgs } from "@/modules/forum/posts/delete/dto/delete.args";
import { DeleteForumsPostsService } from "@/modules/forum/posts/delete/delete.service";

@Resolver()
export class DeleteForumPostsResolver {
  constructor(private readonly service: DeleteForumsPostsService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async forum_posts__delete(
    @CurrentUser() user: User,
    @Args() args: DeletePostsForumsArgs
  ): Promise<string> {
    return await this.service.delete(user, args);
  }
}
