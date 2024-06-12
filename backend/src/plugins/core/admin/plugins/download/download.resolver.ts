import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, User } from "@vitnode/backend";

import { DownloadAdminPluginsService } from "./download.service";
import { DownloadAdminPluginsArgs } from "./dto/download.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { OnlyForDevelopment } from "@/utils/guards/dev.guard";

@Resolver()
export class DownloadAdminPluginsResolver {
  constructor(private readonly service: DownloadAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__download(
    @Args() args: DownloadAdminPluginsArgs,
    @CurrentUser() user: User
  ): Promise<string> {
    return this.service.download(args, user);
  }
}
