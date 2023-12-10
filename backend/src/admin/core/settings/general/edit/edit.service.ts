import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { GeneralAdminSettingsObj } from '../dto/general.obj';
import { EditGeneralAdminSettingsArgs } from './dto/edit.args';

@Injectable()
export class EditGeneralAdminSettingsService {
  async edit(data: EditGeneralAdminSettingsArgs): Promise<GeneralAdminSettingsObj> {
    const config = fs.readFileSync(join('..', 'config.json'), 'utf8');

    const newData = {
      ...JSON.parse(config),
      ...data
    };

    fs.writeFile(join('..', 'config.json'), JSON.stringify(newData, null, 2), 'utf8', err => {
      if (err) throw err;
    });

    return data;
  }
}
