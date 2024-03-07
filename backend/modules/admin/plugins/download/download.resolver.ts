import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DownloadAdminPluginsService } from "./download.service";
import { DownloadAdminPluginsArgs } from "./dto/download.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";

@Resolver()
export class DownloadAdminPluginsResolver {
  constructor(private readonly service: DownloadAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__download(
    @Args() args: DownloadAdminPluginsArgs,
    @CurrentUser() user: User
  ): Promise<string> {
    return await this.service.download(args, user);
  }
}
