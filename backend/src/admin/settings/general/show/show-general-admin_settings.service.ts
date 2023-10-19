import { Injectable } from '@nestjs/common';

import { ShowGeneralAdminSettingsObj } from './dto/show-general-admin_settings.obj';

import * as data from '@/utils/config.json';

@Injectable()
export class ShowGeneralAdminSettingsService {
  async show(): Promise<ShowGeneralAdminSettingsObj> {
    return {
      site_name: data.side_name
    };
  }
}
