import { ABSOLUTE_PATHS } from '@/app.module';
import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';
import { readdir } from 'fs/promises';
import { ShowMiddlewareObj } from 'vitnode-shared/middleware/get.middleware.dto';

@Injectable()
export class GetMiddlewareService {
  async get(): Promise<ShowMiddlewareObj> {
    // TODO: Add cache
    const config = getConfigFile();
    const plugins = await readdir(ABSOLUTE_PATHS.plugins);

    return {
      languages: config.langs,
      authorization: {
        force_login: config.settings.authorization.force_login,
        lock_register: config.settings.authorization.lock_register,
      },
      plugins: [
        'admin',
        ...plugins.filter(plugin => !['plugins.module.ts'].includes(plugin)),
      ],
      is_email_enabled: false, // TODO: Add email service
      is_ai_enabled: false, // TODO: Add AI service
    };
  }
}
