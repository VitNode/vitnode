import { AdminAuthGuards } from '@/utils';
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
  admin__core_authorization_settings__show(): ShowAdminAuthorizationSettingsObj {
    return this.service.show();
  }
}
