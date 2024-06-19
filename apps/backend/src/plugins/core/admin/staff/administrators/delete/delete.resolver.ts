import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteAdminStaffAdministratorsService } from "./delete.service";
import { DeleteAdminStaffAdministratorsArgs } from "./dto/delete.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class DeleteAdminStaffAdministratorsResolver {
  constructor(
    private readonly service: DeleteAdminStaffAdministratorsService
  ) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_administrators__delete(
    @Args() args: DeleteAdminStaffAdministratorsArgs
  ): Promise<string> {
    return this.service.delete(args);
  }
}
