import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';

import { ShowAdminStaffAdministratorsObj } from '../show/show.dto';
import { coreAdminPermissions } from './core-admin-permissions';

@Injectable()
export class PermissionsAdminStaffAdministratorsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async getPermissions(): Promise<
    ShowAdminStaffAdministratorsObj['permissions']
  > {
    const plugins = await this.databaseService.db.query.core_plugins.findMany();

    const permissionsFromPlugins: ShowAdminStaffAdministratorsObj['permissions'] =
      plugins.map(plugin => {
        const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
          code: plugin.code,
        }).config;
        if (!existsSync(pathConfig)) {
          return {
            plugin_code: plugin.code,
            plugin: plugin.name,
            groups: [],
          };
        }

        const config: ConfigPlugin = JSON.parse(
          readFileSync(pathConfig, 'utf8'),
        );

        return {
          plugin_code: plugin.code,
          plugin: plugin.name,
          groups: config.permissions_admin ?? [],
        };
      });

    return [...coreAdminPermissions, ...permissionsFromPlugins];
  }
}
