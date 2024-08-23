import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminAuthorizationSettingsObj } from './dto/show.obj';
import { ShowAdminAuthorizationSettingsService } from './show.service';

import { AdminAuthGuards } from '@/utils';

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
