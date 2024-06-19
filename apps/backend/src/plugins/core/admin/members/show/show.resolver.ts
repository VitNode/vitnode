import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowAdminMembersService } from "./show.service";
import { ShowAdminMembersObj } from "./dto/show.obj";
import { ShowAdminMembersArgs } from "./dto/show.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class ShowAdminMembersResolver {
  constructor(private readonly service: ShowAdminMembersService) {}

  @Query(() => ShowAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__show(
    @Args() args: ShowAdminMembersArgs
  ): Promise<ShowAdminMembersObj> {
    return this.service.show(args);
  }
}
