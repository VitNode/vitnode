import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin, NotFoundError } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { DeleteAdminPermissionsAdminPluginsArgs } from './delete.dto';

@Injectable()
export class DeleteAdminPermissionsAdminPluginsService {
  async delete({
    id,
    plugin_code,
    parent_id,
  }: DeleteAdminPermissionsAdminPluginsArgs): Promise<string> {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }

    const config: ConfigPlugin = JSON.parse(await readFile(pathConfig, 'utf8'));

    const parent = config.permissions_admin?.find(
      permission => permission.id === parent_id,
    );

    if (!parent && parent_id) {
      throw new NotFoundError('Parent permission for the plugin');
    }

    const existsPermission = parent
      ? parent.children.find(child => child === id)
      : config.permissions_admin?.find(permission => permission.id === id);

    if (!existsPermission) {
      throw new NotFoundError('Permission');
    }

    if (parent) {
      config.permissions_admin = config.permissions_admin?.map(permission => {
        if (permission.id === parent_id) {
          permission.children = permission.children.filter(
            child => child !== id,
          );
        }

        return permission;
      });
    } else {
      config.permissions_admin = config.permissions_admin?.filter(
        permission => permission.id !== id,
      );
    }

    await writeFile(pathConfig, JSON.stringify(config, null, 2));

    return 'Permission deleted';
  }
}
