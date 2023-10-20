import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { GeneralAdminSettingsObj } from '../dto/general-admin_settings.obj';
import { EditGeneralAdminSettingsArgs } from './dto/edit-general-admin_settings.args';

@Injectable()
export class EditGeneralAdminSettingsService {
  async edit(data: EditGeneralAdminSettingsArgs): Promise<GeneralAdminSettingsObj> {
    const urlToFile = join('utils', `config.json`);

    fs.writeFile(urlToFile, JSON.stringify(data, null, 2), 'utf8', err => {
      if (err) throw err;
    });

    return data;
  }
}
