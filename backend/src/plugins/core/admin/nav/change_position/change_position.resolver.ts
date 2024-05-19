import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ChangePositionAdminNavService } from "./change_position.service";
import { ChangePositionAdminNavArgs } from "./dto/change_position.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class ChangePositionAdminNavResolver {
  constructor(private readonly service: ChangePositionAdminNavService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav__change_position(
    @Args() args: ChangePositionAdminNavArgs
  ): Promise<string> {
    return this.service.changePosition(args);
  }
}
