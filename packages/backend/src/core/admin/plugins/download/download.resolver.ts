import { CurrentUser, User } from '@/decorators';
import { AdminAuthGuards, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DownloadAdminPluginsService } from './download.service';
import { DownloadAdminPluginsArgs } from './dto/download.args';

@Resolver()
export class DownloadAdminPluginsResolver {
  constructor(private readonly service: DownloadAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__download(
    @Args() args: DownloadAdminPluginsArgs,
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.service.download(args, user);
  }
}
