import { PermissionsStaff } from '@/core/admin/staff/administrators/permissions/dto';
import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin, NotFoundError } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

@Injectable()
export class ShowAdminPermissionsAdminPluginsService {
  async show({
    plugin_code,
  }: {
    plugin_code: string;
  }): Promise<PermissionsStaff[]> {
    const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({
      code: plugin_code,
    }).config;
    if (!existsSync(pathConfig)) {
      throw new NotFoundError('Plugin');
    }

    const config: ConfigPlugin = JSON.parse(await readFile(pathConfig, 'utf8'));

    return config.permissions_admin ?? [];
  }
}
