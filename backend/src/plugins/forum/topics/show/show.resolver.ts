import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowTopicsForumsService } from "./show.service";
import { ShowTopicsForumsArgs } from "./dto/show.args";
import { ShowTopicsForumsObj } from "./dto/show.obj";

import { AuthGuards, OptionalAuth } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "../../../../utils/decorators/user.decorator";

@Resolver()
export class ShowTopicsForumsResolver {
  constructor(private readonly service: ShowTopicsForumsService) {}

  @Query(() => ShowTopicsForumsObj)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async forum_topics__show(
    @Args() args: ShowTopicsForumsArgs,
    @CurrentUser() user: User | null
  ): Promise<ShowTopicsForumsObj> {
    return this.service.show(args, user);
  }
}
