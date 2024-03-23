import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowForumForumsAdminService } from "./show.service";
import { ShowForumForumsAdminObj } from "./dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { ShowForumForumsArgs } from "@/modules/forum/forums/show/dto/show.args";

@Resolver()
export class ShowForumForumsAdminResolver {
  constructor(private readonly service: ShowForumForumsAdminService) {}

  @Query(() => ShowForumForumsAdminObj)
  @UseGuards(AdminAuthGuards)
  async admin__forum_forums__show(
    @Args() args: ShowForumForumsArgs
  ): Promise<ShowForumForumsAdminObj> {
    return await this.service.show(args);
  }
}
