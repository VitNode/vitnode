import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin, User } from '@/index';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { AdminPermissionsAdminSessionsService } from '../../sessions/authorization/admin-permissions.service';
import { coreNav } from './core.nav';
import { ShowAdminNavObj } from './show.dto';

@Injectable()
export class ShowAdminNavService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly adminPermissionsService: AdminPermissionsAdminSessionsService,
  ) {}

  async show(user: User): Promise<ShowAdminNavObj[]> {
    const permissions: {
      groups: { id: string; permissions: string[] }[];
      plugin_code: string;
    }[] = await this.adminPermissionsService.getPermissions({
      user,
    });

    const adminNavPlugins =
      await this.databaseService.db.query.core_plugins.findMany({
        orderBy: (table, { asc }) => asc(table.created),
        columns: {
          code: true,
        },
      });

    const navFromPlugins = adminNavPlugins.map(({ code }) => {
      const pathConfig = ABSOLUTE_PATHS_BACKEND.plugin({ code }).config;
      if (!fs.existsSync(pathConfig)) {
        return {
          code,
          nav: [],
        };
      }

      const config: ConfigPlugin = JSON.parse(
        fs.readFileSync(pathConfig, 'utf8'),
      );

      return {
        code,
        nav: config.nav,
      };
    });

    const nav = [...coreNav, ...navFromPlugins].filter(
      plugin => plugin.nav.length > 0,
    );
    if (permissions.length === 0) return nav;

    // Create a map for quick lookup of permissions by plugin code
    const permissionMap = new Map(
      permissions.map(permission => [permission.plugin_code, permission]),
    );

    // Filter nav to include only plugins present in permissions
    const pluginsInPermissions = nav.filter(plugin =>
      permissionMap.has(plugin.code),
    );

    // Map over the filtered plugins to process their nav items
    const filterGroups = pluginsInPermissions.map(plugin => {
      const pluginPermission = permissionMap.get(plugin.code);
      if (!pluginPermission) return plugin;

      // Create a map of group IDs to group objects with a Set of permissions
      const groupMap = new Map();
      pluginPermission.groups.forEach(group => {
        groupMap.set(group.id, {
          ...group,
          permissionSet: new Set(group.permissions),
        });
      });

      // Filter the nav items based on the permissions
      const filteredNav = plugin.nav.filter(navItem => {
        return (
          groupMap.has(navItem.code) ||
          groupMap.has(`can_manage_${navItem.code}`) ||
          navItem.code === 'dashboard'
        );
      });

      // Map over filteredNav to process each navItem
      const processedNav = filteredNav.map(navItem => {
        const group =
          groupMap.get(navItem.code) ||
          groupMap.get(`can_manage_${navItem.code}`);

        if (!group) {
          return { ...navItem, permissions: [] };
        }

        // If group.permissions is empty, return navItem as is
        if (group.permissions.length === 0) {
          return navItem;
        }

        // Filter navItem's children based on group.permissions
        const filteredChildren = navItem.children?.filter(child =>
          group.permissionSet.has(`can_manage_${group.id}_${child.code}`),
        );

        return {
          ...navItem,
          children: filteredChildren,
        };
      });

      return {
        ...plugin,
        nav: processedNav,
      };
    });

    return filterGroups.filter(plugin => plugin.nav.length > 0);
  }
}
