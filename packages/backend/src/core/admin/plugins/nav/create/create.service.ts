import { CustomError, NotFoundError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  removeSpecialCharacters,
} from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { HelpersAdminNavPluginsService } from '../helpers.service';
import { ShowAdminNavPluginsObj } from '../show/show.dto';
import { CreateAdminNavPluginsArgs } from './create.dto';

@Injectable()
export class CreateAdminNavPluginsService extends HelpersAdminNavPluginsService {
  private async createI18n({
    code,
    parent_code,
    plugin_code,
  }: Pick<CreateAdminNavPluginsArgs, 'code' | 'parent_code' | 'plugin_code'>) {
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
          lang[`admin_${plugin_code}`].nav = {
            ...lang[`admin_${plugin_code}`].nav,
            [`${parent_code}_${code}`]: code,
          };
        } else {
          lang[`admin_${plugin_code}`].nav = {
            ...lang[`admin_${plugin_code}`].nav,
            [code]: code,
          };
        }
        await writeFile(path, JSON.stringify(lang, null, 2));
      }),
    );
  }

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

    // Update i18n
    await this.createI18n({
      code: currentCode,
      parent_code,
      plugin_code,
    });

    // Create page in AdminCP
    const pathPage = join(
      ABSOLUTE_PATHS_BACKEND.plugin({
        code: plugin_code,
      }).frontend.admin_pages,
      parent_code ? join(parent_code, currentCode) : currentCode,
    );

    if (!existsSync(pathPage)) {
      await mkdir(pathPage, { recursive: true });
    }

    await writeFile(
      join(pathPage, 'page.tsx'),
      `export default function Page() {
  return <div>Page for ${code}</div>;
}
`,
    );

    return {
      code: currentCode,
      icon,
      keywords,
    };
  }
}
