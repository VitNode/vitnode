import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowForumForumsService } from "./show.service";
import { ShowForumForumsObj } from "./dto/show.obj";
import { ShowForumForumsArgs } from "./dto/show.args";

import { AuthGuards, OptionalAuth } from "../../../../utils/guards/auth.guard";
import { CurrentUser, User } from "../../../../utils/decorators/user.decorator";

@Resolver()
export class ShowForumForumsResolver {
  constructor(private readonly service: ShowForumForumsService) {}

  @Query(() => ShowForumForumsObj)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async forum_forums__show(
    @Args() args: ShowForumForumsArgs,
    @CurrentUser() user: User | null
  ): Promise<ShowForumForumsObj> {
    return this.service.show(args, user);
  }
}
