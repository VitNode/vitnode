import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowGeneralAdminSettingsService } from './show/show-general-admin_settings.service';
import { ShowGeneralAdminSettingsObj } from './show/dto/show-general-admin_settings.obj';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class GeneralAdminSettingsResolver {
  constructor(private readonly showService: ShowGeneralAdminSettingsService) {}

  @Query(() => ShowGeneralAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  async show_general_admin_settings(): Promise<ShowGeneralAdminSettingsObj> {
    return this.showService.show();
  }
}
