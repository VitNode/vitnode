import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AdminAuthGuards, OnlyForDevelopment } from "vitnode-backend";

import { DeleteAdminNavPluginsService } from "./delete.service";
import { DeleteCreateAdminNavPluginsArgs } from "./dto/delete.args";

@Resolver()
export class DeleteAdminNavPluginsResolver {
  constructor(private readonly service: DeleteAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__delete(
    @Args() args: DeleteCreateAdminNavPluginsArgs
  ): string {
    return this.service.delete(args);
  }
}
