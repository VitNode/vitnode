import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateForumTopicsService } from "./create.service";
import { CreateForumTopicsArgs } from "./dto/create.args";
import { ShowTopicsForums } from "../show/dto/show.obj";

import { AuthGuards } from "@/src/utils/guards/auth.guards";
import { CurrentUser, User } from "@/src/utils/decorators/user.decorator";
import { Ctx } from "@/src/types/context.type";

@Resolver()
export class CreateForumTopicsResolver {
  constructor(private readonly service: CreateForumTopicsService) {}

  @Mutation(() => ShowTopicsForums)
  @UseGuards(AuthGuards)
  async forum_topics__create(
    @CurrentUser() user: User,
    @Args() args: CreateForumTopicsArgs,
    @Context() context: Ctx
  ): Promise<ShowTopicsForums> {
    return await this.service.create(user, args, context);
  }
}
