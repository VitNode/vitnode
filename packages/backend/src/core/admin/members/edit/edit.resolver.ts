import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminMembersService } from "./edit.service";
import { EditAdminMembersArgs } from "./dto/edit.args";
import { EditAdminMembersObj } from "./dto/edit.obj";

import { AdminAuthGuards } from "../../../../utils";

@Resolver()
export class EditAdminMembersResolver {
  constructor(private readonly service: EditAdminMembersService) {}

  @Mutation(() => EditAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__edit(
    @Args() args: EditAdminMembersArgs,
  ): Promise<EditAdminMembersObj> {
    return this.service.edit(args);
  }
}
