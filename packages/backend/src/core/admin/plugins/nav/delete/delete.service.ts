import { NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { DeleteCreateAdminNavPluginsArgs } from './delete.dto';

@Injectable()
export class DeleteAdminNavPluginsService {
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

    return 'Success!';
  }
}
