import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { removeSpecialCharacters } from 'vitnode-shared';

import { ShowAdminNavPluginsObj } from '../show/dto/show.obj';
import { EditCreateAdminNavPluginsArgs } from './dto/edit.args';

import { CustomError, NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';

@Injectable()
export class EditAdminNavPluginsService {
  edit({
    code,
    href,
    icon,
    previous_code,
    plugin_code,
    parent_code,
    keywords,
  }: EditCreateAdminNavPluginsArgs): ShowAdminNavPluginsObj {
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
      const children = parent.children || [];
      const navIndex = children.findIndex(nav => nav.code === previous_code);

      children[navIndex] = {
        code: currentCode,
        href,
        icon: icon ?? null,
        keywords,
      };
    } else {
      const navIndex = config.nav.findIndex(nav => nav.code === previous_code);
      config.nav[navIndex] = {
        code: currentCode,
        href,
        icon: icon ?? null,
        keywords,
      };
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
