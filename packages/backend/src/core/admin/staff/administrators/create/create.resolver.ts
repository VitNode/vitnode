import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminStaffAdministratorsService } from "./create.service";
import { CreateAdminStaffAdministratorsArgs } from "./dto/create.args";
import { ShowAdminStaffAdministrators } from "../show/dto/show.obj";
import { AdminAuthGuards } from "../../../../../utils";

@Resolver()
export class CreateAdminStaffAdministratorResolver {
  constructor(
    private readonly service: CreateAdminStaffAdministratorsService
  ) {}

  @Mutation(() => ShowAdminStaffAdministrators)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_administrators__create(
    @Args() args: CreateAdminStaffAdministratorsArgs
  ): Promise<ShowAdminStaffAdministrators> {
    return this.service.create(args);
  }
}
