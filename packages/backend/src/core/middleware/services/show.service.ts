import { ABSOLUTE_PATHS } from '@/app.module';
import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { ManifestWithLang } from 'vitnode-shared/manifest.dto';
import { ShowMiddlewareObj } from 'vitnode-shared/middleware.dto';

@Injectable()
export class ShowMiddlewareService {
  protected async getManifest({
    langCodes,
  }: {
    langCodes: string[];
  }): Promise<ManifestWithLang[]> {
    return await Promise.all(
      langCodes.map(async lang => {
        const path = join(
          ABSOLUTE_PATHS.uploads.public,
          'assets',
          lang,
          'manifest.webmanifest',
        );
        const manifest = JSON.parse(
          await readFile(path, 'utf8'),
        ) as ManifestWithLang;

        return manifest;
      }),
    );
  }

  async show(): Promise<ShowMiddlewareObj> {
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
      site_name: config.settings.main.site_name,
      site_short_name: config.settings.main.site_short_name,
    };
  }
}
