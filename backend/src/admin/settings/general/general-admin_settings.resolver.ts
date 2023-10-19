import { Query, Resolver } from '@nestjs/graphql';

import { ShowGeneralAdminSettingsService } from './show/show-general-admin_settings.service';
import { ShowGeneralAdminSettingsObj } from './show/dto/show-general-admin_settings.obj';

@Resolver()
export class GeneralAdminSettingsResolver {
  constructor(private readonly showService: ShowGeneralAdminSettingsService) {}

  @Query(() => ShowGeneralAdminSettingsObj)
  async show_general_admin_settings(): Promise<ShowGeneralAdminSettingsObj> {
    return this.showService.show();
  }
}
