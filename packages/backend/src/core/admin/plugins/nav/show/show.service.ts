import { NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ShowAdminNavPluginsObj } from './show.dto';

@Injectable()
export class ShowAdminNavPluginsService {
  show({ plugin_code }: { plugin_code: string }): ShowAdminNavPluginsObj[] {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }

    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, 'utf8'),
    );

    return config.nav.map(nav => {
      return {
        ...nav,
        keywords: nav.keywords,
      };
    });
  }
}
