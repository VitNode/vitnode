import { CustomError, NotFoundError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  removeSpecialCharacters,
} from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { HelpersAdminNavPluginsService } from '../helpers.service';
import { ShowAdminNavPluginsObj } from '../show/show.dto';
import { CreateAdminNavPluginsArgs } from './create.dto';

@Injectable()
export class CreateAdminNavPluginsService extends HelpersAdminNavPluginsService {
  async create({
    code,
    icon,
    plugin_code,
    parent_code,
    keywords,
  }: CreateAdminNavPluginsArgs): Promise<ShowAdminNavPluginsObj> {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }
    const config: ConfigPlugin = JSON.parse(await readFile(pathConfig, 'utf8'));

    const currentCode = removeSpecialCharacters(code);
    const codeExists = this.findItemByCode({
      items: config.nav,
      code: currentCode,
    });

    if (codeExists) {
      throw new CustomError({
        message: 'Code already exists',
        code: 'CODE_ALREADY_EXISTS',
      });
    }

    // Update config
    if (parent_code) {
      const parent = config.nav.find(nav => nav.code === parent_code);

      if (!parent) {
        throw new NotFoundError('Parent');
      }

      parent.children = parent.children ?? [];
      parent.children.push({
        code: currentCode,
        icon,
        keywords,
      });
    } else {
      config.nav.push({
        code: currentCode,
        icon,
        keywords,
      });
    }

    await writeFile(pathConfig, JSON.stringify(config, null, 2));

    return {
      code: currentCode,
      icon,
      keywords,
    };
  }
}
