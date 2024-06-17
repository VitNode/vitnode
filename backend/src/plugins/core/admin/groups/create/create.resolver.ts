import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SetMetadata, UseGuards } from "@nestjs/common";

import { CreateAdminGroupsService } from "./create.service";
import { CreateAdminGroupsArgs } from "./dto/create.args";
import { ShowAdminGroups } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class CreateAdminGroupsResolver {
  constructor(private readonly service: CreateAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminAuthGuards)
  @SetMetadata("permission", "create_group")
  async core_groups__admin_create(
    @Args() args: CreateAdminGroupsArgs
  ): Promise<ShowAdminGroups> {
    return this.service.create(args);
  }
}
