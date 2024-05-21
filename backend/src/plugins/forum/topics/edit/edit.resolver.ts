import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditForumTopicsService } from "./edit.service";
import { ShowTopicsForums } from "../show/dto/show.obj";
import { EditForumTopicsArgs } from "./dto/edit.args";

import { AuthGuards } from "@/utils/guards/auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";

@Resolver()
export class EditForumTopicsResolver {
  constructor(private readonly service: EditForumTopicsService) {}

  @Mutation(() => ShowTopicsForums)
  @UseGuards(AuthGuards)
  async forum_topics__edit(
    @Args() args: EditForumTopicsArgs,
    @CurrentUser() user: User
  ): Promise<ShowTopicsForums> {
    return this.service.edit(args, user);
  }
}
