import { CurrentUser, User } from '@/decorators';
import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { TestAdminEmailSettingsServiceArgs } from './test.dto';
import { TestAdminEmailSettingsService } from './test.service';

@Resolver()
export class TestAdminEmailSettingsResolver {
  constructor(private readonly service: TestAdminEmailSettingsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_email',
  })
  async admin__core_email_settings__test(
    @Args() args: TestAdminEmailSettingsServiceArgs,
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.service.test(args, user);
  }
}
