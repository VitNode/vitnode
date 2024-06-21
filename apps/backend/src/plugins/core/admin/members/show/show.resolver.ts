import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { ShowAdminMembersService } from "./show.service";
import { ShowAdminMembersObj } from "./dto/show.obj";
import { ShowAdminMembersArgs } from "./dto/show.args";

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
