import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { AuthGuards } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { DeleteForumsPostsService } from "./delete.service";
import { DeletePostsForumsArgs } from "./dto/delete.args";

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
