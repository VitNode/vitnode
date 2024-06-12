import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminMembersService } from "./edit.service";
import { EditAdminMembersArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class EditAdminMembersResolver {
  constructor(private readonly service: EditAdminMembersService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__edit(
    @Args() args: EditAdminMembersArgs
  ): Promise<string> {
    return this.service.edit(args);
  }
}
