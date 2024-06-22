import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DownloadAdminCoreLanguageService } from "./download.service";
import { DownloadCoreAdminLanguagesArgs } from "./dto/download.args";

import { AdminAuthGuards } from "../../../../utils";
import { CurrentUser, User } from "../../../../decorators";

@Resolver()
export class DownloadAdminCoreLanguagesResolver {
  constructor(private readonly service: DownloadAdminCoreLanguageService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__download(
    @CurrentUser() user: User,
    @Args() args: DownloadCoreAdminLanguagesArgs
  ): Promise<string> {
    return this.service.download(user, args);
  }
}
