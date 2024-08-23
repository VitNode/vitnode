import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminNavPluginsObj } from '../show/dto/show.obj';
import { CreateAdminNavPluginsArgs } from './dto/create.args';
import { HelpersAdminNavPluginsService } from '../helpers.service';

import { CustomError, NotFoundError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  removeSpecialCharacters,
} from '@/index';

@Injectable()
export class CreateAdminNavPluginsService extends HelpersAdminNavPluginsService {
  create({
    code,
    href,
    icon,
    plugin_code,
    parent_code,
    keywords,
  }: CreateAdminNavPluginsArgs): ShowAdminNavPluginsObj {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }
    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, 'utf8'),
    );

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
        href,
        icon,
        keywords,
      });
    } else {
      config.nav.push({
        code: currentCode,
        href,
        icon,
        keywords,
      });
    }

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return {
      code: currentCode,
      href,
      icon,
      keywords,
    };
  }
}
