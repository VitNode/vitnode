import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, User } from "@vitnode/backend";

import { DownloadAdminThemesService } from "./download.service";
import { DownloadAdminThemesArgs } from "./dto/download.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class DownloadAdminThemesResolver {
  constructor(private readonly service: DownloadAdminThemesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_themes__download(
    @CurrentUser() user: User,
    @Args() args: DownloadAdminThemesArgs
  ): Promise<string> {
    return this.service.download(user, args);
  }
}
