import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditForumForumsService } from "./edit.service";
import { CreateForumForumsObj } from "../create/dto/create.obj";
import { EditForumForumsArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";

@Resolver()
export class EditForumForumsResolver {
  constructor(private readonly service: EditForumForumsService) {}

  @Mutation(() => CreateForumForumsObj)
  @UseGuards(AdminAuthGuards)
  async admin__forum_forums__edit(
    @Args() args: EditForumForumsArgs,
    @CurrentUser() user: User | null
  ): Promise<CreateForumForumsObj> {
    return this.service.edit(args, user);
  }
}
