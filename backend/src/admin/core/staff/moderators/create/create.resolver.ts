import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminStaffModeratorsService } from "./create.service";
import { CreateAdminStaffModeratorsArgs } from "./dto/create.args";
import { ShowAdminStaffModerators } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class CreateAdminStaffModeratorsResolver {
  constructor(private readonly service: CreateAdminStaffModeratorsService) {}

  @Mutation(() => ShowAdminStaffModerators)
  @UseGuards(AdminAuthGuards)
  async core_staff_moderators__admin__create(
    @Args() args: CreateAdminStaffModeratorsArgs
  ): Promise<ShowAdminStaffModerators> {
    return await this.service.create(args);
  }
}
