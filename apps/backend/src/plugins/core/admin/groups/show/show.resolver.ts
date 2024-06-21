import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { AdminAuthGuards } from "vitnode-backend";

import { ShowAdminGroupsService } from "./show.service";
import { ShowAdminGroupsObj } from "./dto/show.obj";
import { ShowAdminGroupsArgs } from "./dto/show.args";

@Resolver()
export class ShowAdminGroupsResolver {
  constructor(private readonly service: ShowAdminGroupsService) {}

  @Query(() => ShowAdminGroupsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_groups__show(
    @Args() args: ShowAdminGroupsArgs
  ): Promise<ShowAdminGroupsObj> {
    return this.service.show(args);
  }
}
