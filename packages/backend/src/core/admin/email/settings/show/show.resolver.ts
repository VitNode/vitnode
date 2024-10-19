import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminEmailSettingsServiceObj } from './show.dto';
import { ShowAdminEmailSettingsService } from './show.service';

@Resolver()
export class ShowAdminEmailSettingsResolver {
  constructor(private readonly service: ShowAdminEmailSettingsService) {}

  @Query(() => ShowAdminEmailSettingsServiceObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_email',
  })
  admin__core_email_settings__show(): ShowAdminEmailSettingsServiceObj {
    return this.service.show();
  }
}
