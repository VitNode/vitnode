import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { CreateAdminStaffModeratorsService } from "./create.service";
import { CreateAdminStaffModeratorsArgs } from "./dto/create.args";
import { ShowAdminStaffModerators } from "../show/dto/show.obj";

@Resolver()
export class CreateAdminStaffModeratorsResolver {
  constructor(private readonly service: CreateAdminStaffModeratorsService) {}

  @Mutation(() => ShowAdminStaffModerators)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_moderators__create(
    @Args() args: CreateAdminStaffModeratorsArgs
  ): Promise<ShowAdminStaffModerators> {
    return this.service.create(args);
  }
}
