import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { DeleteAdminGroupsService } from "./delete.service";
import { DeleteAdminGroupsArgs } from "./dto/delete.args";

@Resolver()
export class DeleteAdminGroupsResolver {
  constructor(private readonly service: DeleteAdminGroupsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_groups__delete(
    @Args() args: DeleteAdminGroupsArgs
  ): Promise<string> {
    return this.service.delete(args);
  }
}
