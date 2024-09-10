import { NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { HelpersAdminNavPluginsService } from '../helpers.service';
import { ChangePositionAdminNavPluginsArgs } from './change_position.dto';

@Injectable()
export class ChangePositionAdminNavPluginsService extends HelpersAdminNavPluginsService {
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

      // Move children to root if itemToMove has children
      if (itemToMove.children && itemToMove.children.length > 0) {
        config.nav = [
          ...config.nav,
          ...itemToMove.children.map(child => ({
            ...child,
            children: [],
          })),
        ];
      }

      delete itemToMove.children;
      parentItem.children = parentItem.children ?? [];
      parentItem.children.splice(index_to_move, 0, itemToMove);
    } else {
      // If parent_code is not provided, add the item to the root of the nav array
      config.nav.splice(index_to_move, 0, itemToMove);
    }

    // Save config
    await writeFile(pathConfig, JSON.stringify(config, null, 2));

    return 'Success!';
  }
}
