import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UploadAdminPluginsArgs } from './upload.dto';
import { UploadAdminPluginsService } from './upload.service';

@Resolver()
export class UploadAdminPluginsResolver {
  constructor(private readonly service: UploadAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__upload(
    @Args() args: UploadAdminPluginsArgs,
  ): Promise<string> {
    return this.service.upload(args);
  }
}
