import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowForumForumsAdminService } from "./show.service";
import { ShowForumForumsAdminObj } from "./dto/show.obj";
import { ShowForumForumsAdminArgs } from "./dto/show.args";

import { AdminAuthGuards } from "@/src/utils/guards/admin-auth.guards";

@Resolver()
export class ShowForumForumsAdminResolver {
  constructor(private readonly service: ShowForumForumsAdminService) {}

  @Query(() => ShowForumForumsAdminObj)
  @UseGuards(AdminAuthGuards)
  async admin__forum_forums__show(
    @Args() args: ShowForumForumsAdminArgs
  ): Promise<ShowForumForumsAdminObj> {
    return await this.service.show(args);
  }
}
