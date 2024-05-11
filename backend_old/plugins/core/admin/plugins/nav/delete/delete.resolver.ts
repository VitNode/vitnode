import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { DeleteAdminNavPluginsService } from "./delete.service";
import { DeleteCreateAdminNavPluginsArgs } from "./dto/delete.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { OnlyForDevelopment } from "@/utils/guards/dev.guard";

@Resolver()
export class DeleteAdminNavPluginsResolver {
  constructor(private readonly service: DeleteAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__nav__delete(
    @Args() args: DeleteCreateAdminNavPluginsArgs
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
