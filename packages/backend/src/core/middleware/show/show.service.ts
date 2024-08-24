import { Injectable } from '@nestjs/common';
import { readdir } from 'fs/promises';

import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '../../..';
import { ShowCoreMiddlewareObj } from './dto/show.obj';

@Injectable()
export class ShowCoreMiddlewareService {
  async show(): Promise<ShowCoreMiddlewareObj> {
    const config = getConfigFile();
    const plugins = await readdir(ABSOLUTE_PATHS_BACKEND.plugins);

    return {
      languages: config.langs,
      plugins: [
        'admin',
        ...plugins.filter(plugin => !['plugins.module.ts'].includes(plugin)),
      ],
      ...config,
      ...config.settings,
    };
  }
}
