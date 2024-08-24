import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminEmailSettingsServiceObj } from './dto/show.obj';
import { ShowAdminEmailSettingsService } from './show.service';

@Resolver()
export class ShowAdminEmailSettingsResolver {
  constructor(private readonly service: ShowAdminEmailSettingsService) {}

  @Query(() => ShowAdminEmailSettingsServiceObj)
  @UseGuards(AdminAuthGuards)
  admin__core_email_settings__show(): ShowAdminEmailSettingsServiceObj {
    return this.service.show();
  }
}
