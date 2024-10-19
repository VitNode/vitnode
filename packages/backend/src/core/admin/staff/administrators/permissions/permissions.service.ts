import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';

import { ShowAdminStaffAdministratorsObj } from '../show/show.dto';
import { coreAdminPermissions } from './core-admin-permissions';

@Injectable()
export class PermissionsAdminStaffAdministratorsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async getPermissions(): Promise<
    ShowAdminStaffAdministratorsObj['permissions']
  > {
    const plugins = await this.databaseService.db.query.core_plugins.findMany();

    return [
      ...coreAdminPermissions,
      ...plugins.map(plugin => ({
        plugin_code: plugin.code,
        plugin: plugin.name,
        groups: [],
      })),
    ];
  }
}
