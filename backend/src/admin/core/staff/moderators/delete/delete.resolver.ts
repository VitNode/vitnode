import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { DeleteAdminStaffModeratorsArgs } from "./dto/delete.args";
import { DeleteAdminStaffModeratorsService } from "./delete.service";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class DeleteAdminStaffModeratorsResolver {
  constructor(private readonly service: DeleteAdminStaffModeratorsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_staff_moderators__admin__delete(
    @Args() args: DeleteAdminStaffModeratorsArgs
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
