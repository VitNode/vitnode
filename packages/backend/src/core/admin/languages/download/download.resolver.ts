import { CurrentUser, User } from '@/decorators';
import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DownloadCoreAdminLanguagesArgs } from './download.dto';
import { DownloadAdminCoreLanguageService } from './download.service';

@Resolver()
export class DownloadAdminCoreLanguagesResolver {
  constructor(private readonly service: DownloadAdminCoreLanguageService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__download(
    @CurrentUser() user: User,
    @Args() args: DownloadCoreAdminLanguagesArgs,
  ): Promise<string> {
    return this.service.download(user, args);
  }
}
