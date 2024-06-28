import { readdir } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import { ShowCoreMiddlewareObj } from './dto/languages.obj';

import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '@/index';

@Injectable()
export class ShowCoreMiddlewareService {
  async languages(): Promise<ShowCoreMiddlewareObj> {
    const config = getConfigFile();

    const plugins = await readdir(ABSOLUTE_PATHS_BACKEND.plugins);

    return {
      languages: config.langs,
      plugins: [
        'admin',
        ...plugins.filter(plugin => !['plugins.module.ts'].includes(plugin)),
      ],
    };
  }
}
