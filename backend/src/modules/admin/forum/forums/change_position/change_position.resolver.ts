import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ChangePositionForumForumsService } from "./change_position.service";
import { ChangePositionForumForumsArgs } from "./dto/change_position.args";

import { AdminAuthGuards } from "@/src/utils/guards/admin-auth.guards";

@Resolver()
export class ChangePositionForumForumsResolver {
  constructor(private readonly service: ChangePositionForumForumsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__forum_forums__change_position(
    @Args() args: ChangePositionForumForumsArgs
  ): Promise<string> {
    return await this.service.changeOrderingForumForums(args);
  }
}
