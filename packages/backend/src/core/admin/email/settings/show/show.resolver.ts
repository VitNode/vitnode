import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminEmailSettingsServiceObj } from './dto/show.obj';
import { ShowAdminEmailSettingsService } from './show.service';

import { AdminAuthGuards } from '@/utils';

@Resolver()
export class ShowAdminEmailSettingsResolver {
  constructor(private readonly service: ShowAdminEmailSettingsService) {}

  @Query(() => ShowAdminEmailSettingsServiceObj)
  @UseGuards(AdminAuthGuards)
  admin__core_email_settings__show(): ShowAdminEmailSettingsServiceObj {
    return this.service.show();
  }
}
