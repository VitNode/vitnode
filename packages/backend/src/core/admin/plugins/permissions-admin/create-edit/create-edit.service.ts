import { PermissionsStaff } from '@/core/admin/staff/administrators/permissions/dto';
import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  CustomError,
  InternalServerError,
  NotFoundError,
} from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { CreateEditAdminPermissionsAdminPluginsArgs } from './create-edit.dto';

@Injectable()
export class CreateEditAdminPermissionsAdminPluginsService {
  async createEdit({
    id,
    old_id,
    plugin_code,
    parent_id,
  }: CreateEditAdminPermissionsAdminPluginsArgs): Promise<PermissionsStaff> {
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

    // Check if the id already exists
    if (old_id !== id) {
      const existsPermission = parent
        ? parent.permissions.find(child => child === id)
        : config.permissions_admin?.find(permission => permission.id === id);

      if (existsPermission) {
        throw new CustomError({
          message: 'Permission already exists',
          code: 'PERMISSION_ALREADY_EXISTS',
        });
      }
    }

    // Edit
    if (old_id) {
      const oldPermission = parent
        ? parent.permissions.find(child => child === old_id)
        : config.permissions_admin?.find(
            permission => permission.id === old_id,
          );

      if (!oldPermission) {
        throw new NotFoundError('Permission with the old id for the plugin');
      }

      let newConfig: ConfigPlugin;

      if (parent) {
        newConfig = {
          ...config,
          permissions_admin: config.permissions_admin?.map(permission => {
            if (permission.id === parent.id) {
              return {
                ...permission,
                children: permission.permissions.map(child => {
                  if (child === old_id) {
                    return id;
                  }

                  return child;
                }),
              };
            }

            return permission;
          }),
        };
      } else {
        newConfig = {
          ...config,
          permissions_admin: config.permissions_admin?.map(permission => {
            if (permission.id === old_id) {
              return {
                id,
                permissions: permission.permissions,
              };
            }

            return permission;
          }),
        };
      }

      await writeFile(pathConfig, JSON.stringify(newConfig, null, 2));

      const returnValue = parent
        ? newConfig.permissions_admin?.find(
            permission => permission.id === parent.id,
          )
        : newConfig.permissions_admin?.find(permission => permission.id === id);

      if (!returnValue) {
        throw new InternalServerError();
      }

      return {
        id,
        permissions: [],
      };
    }

    let newConfig: ConfigPlugin;
    if (parent) {
      newConfig = {
        ...config,
        permissions_admin: (config.permissions_admin ?? []).map(permission => {
          if (permission.id === parent.id) {
            return {
              ...permission,
              permissions: [...permission.permissions, id],
            };
          }

          return permission;
        }),
      };
    } else {
      newConfig = {
        ...config,
        permissions_admin: [
          ...(config.permissions_admin ?? []),
          {
            id,
            permissions: [],
          },
        ],
      };
    }

    await writeFile(pathConfig, JSON.stringify(newConfig, null, 2));

    const returnValue = parent
      ? newConfig.permissions_admin?.find(
          permission => permission.id === parent.id,
        )
      : newConfig.permissions_admin?.find(permission => permission.id === id);

    if (!returnValue) {
      throw new InternalServerError();
    }

    return returnValue;
  }
}
