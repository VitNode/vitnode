import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminAuthorizationSettingsObj } from './show.dto';
import { ShowAdminAuthorizationSettingsService } from './show.service';

@Resolver()
export class ShowAdminAuthorizationSettingsResolver {
  constructor(
    private readonly service: ShowAdminAuthorizationSettingsService,
  ) {}

  @Query(() => ShowAdminAuthorizationSettingsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission('can_manage_authorization_settings')
  admin__core_authorization_settings__show(): ShowAdminAuthorizationSettingsObj {
    return this.service.show();
  }
}
