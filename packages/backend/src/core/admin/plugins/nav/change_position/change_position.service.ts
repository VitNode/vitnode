import { NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, readdir, readFile, rename, writeFile } from 'fs/promises';
import { join } from 'path';

import { HelpersAdminNavPluginsService } from '../helpers.service';
import { ChangePositionAdminNavPluginsArgs } from './change_position.dto';

@Injectable()
export class ChangePositionAdminNavPluginsService extends HelpersAdminNavPluginsService {
  private async changeI18n({
    code,
    plugin_code,
    parent_code,
  }: Pick<
    ChangePositionAdminNavPluginsArgs,
    'code' | 'parent_code' | 'plugin_code'
  >) {
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
          if (lang[`admin_${plugin_code}`].nav[`${parent_code}_${code}`]) {
            return;
          }

          lang[`admin_${plugin_code}`].nav = {
            ...lang[`admin_${plugin_code}`].nav,
            [`${parent_code}_${code}`]: code,
          };

          delete lang[`admin_${plugin_code}`].nav[code];
        } else {
          if (lang[`admin_${plugin_code}`].nav[code]) {
            return;
          }

          lang[`admin_${plugin_code}`].nav = {
            ...lang[`admin_${plugin_code}`].nav,
            [code]: code,
          };

          Object.keys(lang[`admin_${plugin_code}`].nav as object).forEach(
            key => {
              if (key.includes(`_${code}`)) {
                delete lang[`admin_${plugin_code}`].nav[key];
              }
            },
          );
        }

        await writeFile(path, JSON.stringify(lang, null, 2));
      }),
    );
  }

  private findAndRemoveItemByCode({
    items,
    code,
  }: {
    code: string;
    items: ConfigPlugin['nav'];
  }): ConfigPlugin['nav'] {
    return items.filter(item => {
      if (item.code === code) {
        return false;
      }

      if (item.children) {
        item.children = this.findAndRemoveItemByCode({
          items: item.children,
          code,
        });
      }

      return true;
    });
  }

  async changePosition({
    code,
    plugin_code,
    index_to_move,
    parent_code,
  }: ChangePositionAdminNavPluginsArgs): Promise<string> {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }
    const config: ConfigPlugin = JSON.parse(await readFile(pathConfig, 'utf8'));

    // Find the item to be moved
    const itemToMove = this.findItemByCode({ items: config.nav, code });
    if (!itemToMove) {
      throw new NotFoundError('Item');
    }

    // Remove the item from its current position
    config.nav = this.findAndRemoveItemByCode({
      items: config.nav,
      code,
    });

    // If parent_code is provided, add the item to the parent's children
    if (parent_code) {
      const parentItem = this.findItemByCode({
        items: config.nav,
        code: parent_code,
      });
      if (!parentItem) {
        throw new NotFoundError('Parent');
      }

      parentItem.children = parentItem.children ?? [];
      parentItem.children.splice(index_to_move, 0, itemToMove);
    } else {
      // If parent_code is not provided, add the item to the root of the nav array
      config.nav.splice(index_to_move, 0, itemToMove);
    }

    // Save config
    await writeFile(pathConfig, JSON.stringify(config, null, 2));

    // Update i18n
    await this.changeI18n({
      code,
      parent_code,
      plugin_code,
    });

    // Update pages
    const pathPage = join(
      ABSOLUTE_PATHS_BACKEND.plugin({
        code: plugin_code,
      }).frontend.admin_pages,
      code,
      'page.tsx',
    );

    if (existsSync(pathPage) && parent_code) {
      const path = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: plugin_code,
        }).frontend.admin_pages,
        parent_code,
        code,
      );

      if (!existsSync(path)) {
        await mkdir(path, { recursive: true });
      }

      await rename(pathPage, join(path, 'page.tsx'));
    } else if (itemToMove.parent_code) {
      const pathPage = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: plugin_code,
        }).frontend.admin_pages,
        itemToMove.parent_code,
        code,
        'page.tsx',
      );

      if (existsSync(pathPage)) {
        await rename(
          pathPage,
          join(
            ABSOLUTE_PATHS_BACKEND.plugin({
              code: plugin_code,
            }).frontend.admin_pages,
            code,
            'page.tsx',
          ),
        );
      }
    }

    return 'Success!';
  }
}
