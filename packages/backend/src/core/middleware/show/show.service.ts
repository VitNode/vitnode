import { EmailService } from '@/core/admin/email/email.service';
import { AiService } from '@/core/ai/ai.service';
import { Injectable } from '@nestjs/common';
import { readdir } from 'fs/promises';

import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '../../..';
import { ShowCoreMiddlewareObj } from './show.dto';

@Injectable()
export class ShowCoreMiddlewareService {
  constructor(
    private readonly mailService: EmailService,
    private readonly aiService: AiService,
  ) {}

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
      authorization: {
        ...config.settings.authorization,
      },
      is_email_enabled: this.mailService.checkIfEnable(),
      is_ai_enabled: this.aiService.checkIfEnable(),
    };
  }
}
