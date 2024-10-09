import { CustomError, NotFoundError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  removeSpecialCharacters,
} from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { ShowAdminNavPluginsObj } from '../show/show.dto';
import { EditCreateAdminNavPluginsArgs } from './edit.dto';

@Injectable()
export class EditAdminNavPluginsService {
  async edit({
    code,
    icon,
    previous_code,
    plugin_code,
    parent_code,
    keywords,
  }: EditCreateAdminNavPluginsArgs): Promise<ShowAdminNavPluginsObj> {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }
    const config: ConfigPlugin = JSON.parse(await readFile(pathConfig, 'utf8'));

    const currentCode = removeSpecialCharacters(code);
    const existsNavCode = config.nav.find(nav => nav.code === currentCode);
    if (existsNavCode && code !== existsNavCode.code) {
      throw new CustomError({
        message: 'Code already exists',
        code: 'CODE_ALREADY_EXISTS',
      });
    }

    if (parent_code) {
      const parent = config.nav.find(nav => nav.code === parent_code);

      if (!parent) {
        throw new NotFoundError('Parent');
      }

      // Build new children nav
      const children = parent.children ?? [];
      const navIndex = children.findIndex(nav => nav.code === previous_code);

      children[navIndex] = {
        code: currentCode,
        icon: icon ?? null,
        keywords,
      };
    } else {
      const navIndex = config.nav.findIndex(nav => nav.code === previous_code);
      config.nav[navIndex] = {
        code: currentCode,
        icon: icon ?? null,
        keywords,
        children: config.nav[navIndex]?.children,
      };
    }

    await writeFile(pathConfig, JSON.stringify(config, null, 2));

    return {
      code: currentCode,
      icon,
      keywords,
    };
  }
}
