import { CurrentUser, User } from '@/decorators';
import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DownloadAdminPluginsArgs } from './download.dto';
import { DownloadAdminPluginsService } from './download.service';

@Resolver()
export class DownloadAdminPluginsResolver {
  constructor(private readonly service: DownloadAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__download(
    @Args() args: DownloadAdminPluginsArgs,
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.service.download(args, user);
  }
}
