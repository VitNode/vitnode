import {
  AdminAuthGuards,
  AdminPermission,
} from '@/utils/guards/admin-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminCaptchaSecurityObj } from './show.dto';
import { ShowAdminCaptchaSecurityService } from './show.service';

@Resolver()
export class ShowAdminCaptchaSecurityResolver {
  constructor(private readonly service: ShowAdminCaptchaSecurityService) {}

  @Query(() => ShowAdminCaptchaSecurityObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_security',
  })
  admin__core_security__captcha__show(): ShowAdminCaptchaSecurityObj {
    return this.service.show();
  }
}
