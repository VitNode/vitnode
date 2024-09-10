import { NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readdir, readFile, unlink, writeFile } from 'fs/promises';
import { join } from 'path';

import { DeleteCreateAdminNavPluginsArgs } from './delete.dto';

@Injectable()
export class DeleteAdminNavPluginsService {
  private async deleteI18n({
    code,
    parent_code,
    plugin_code,
  }: DeleteCreateAdminNavPluginsArgs) {
    const files = await readdir(
      ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin_code }).frontend.languages,
    );

    await Promise.all(
      files.map(async file => {
        const path = join(
          ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin_code }).frontend
            .languages,
          file,
        );

        const lang = JSON.parse(await readFile(path, 'utf8'));
        if (parent_code) {
          delete lang[`admin_${plugin_code}`].nav[`${parent_code}_${code}`];
        } else {
          delete lang[`admin_${plugin_code}`].nav[code];
        }
        await writeFile(path, JSON.stringify(lang, null, 2));
      }),
    );
  }

  async delete({
    code,
    plugin_code,
    parent_code,
  }: DeleteCreateAdminNavPluginsArgs): Promise<string> {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }
    const config: ConfigPlugin = JSON.parse(await readFile(pathConfig, 'utf8'));

    // Update config
    if (parent_code) {
      const parent = config.nav.find(nav => nav.code === parent_code);

      if (!parent) {
        throw new NotFoundError('Parent nav');
      }

      parent.children = (parent.children ?? []).filter(
        child => child.code !== code,
      );
    } else {
      const codeExists = config.nav.find(nav => nav.code === code);
      if (!codeExists) {
        throw new NotFoundError('Plugin nav');
      }

      config.nav = config.nav.filter(nav => nav.code !== code);
    }

    await writeFile(pathConfig, JSON.stringify(config, null, 2));

    // Delete i18n
    await this.deleteI18n({ code, parent_code, plugin_code });

    // Delete page from AdminCP
    const pathPage = join(
      ABSOLUTE_PATHS_BACKEND.plugin({
        code: plugin_code,
      }).frontend.admin_pages,
      parent_code ? join(parent_code, code) : code,
      'page.tsx',
    );

    if (existsSync(pathPage)) {
      await unlink(pathPage);
    }

    return 'Success!';
  }
}
