import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowPostsForumsService } from "./show.service";
import { ShowPostsForumsObj } from "./dto/show.obj";
import { ShowPostsForumsArgs } from "./dto/show.args";

import { AuthGuards, OptionalAuth } from "@/src/utils/guards/auth.guards";
import { CurrentUser, User } from "@/src/utils/decorators/user.decorator";

@Resolver()
export class ShowPostsForumsResolver {
  constructor(private readonly service: ShowPostsForumsService) {}

  @Query(() => ShowPostsForumsObj)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async forum_posts__show(
    @Args() args: ShowPostsForumsArgs,
    @CurrentUser() user: User | null
  ): Promise<ShowPostsForumsObj> {
    return await this.service.show(args, user);
  }
}
