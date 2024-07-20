import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminNavObj } from './dto/show.obj';

import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { DatabaseService } from '@/utils';

@Injectable()
export class ShowAdminNavService {
  private readonly coreNav: ShowAdminNavObj[] = [
    {
      code: 'core',
      nav: [
        {
          code: 'dashboard',
          href: 'dashboard',
          icon: 'layout-dashboard',
        },
        {
          code: 'settings',
          href: 'general',
          icon: 'settings',
          children: [
            {
              code: 'general',
              href: 'general',
            },
            {
              code: 'security',
              href: 'security',
            },
            {
              code: 'metadata',
              href: 'metadata',
            },
            {
              code: 'email',
              href: 'email',
            },
          ],
        },
        {
          code: 'plugins',
          href: 'plugins',
          icon: 'plug',
        },
        {
          code: 'styles',
          href: 'nav',
          icon: 'paintbrush',
          children: [
            {
              code: 'nav',
              href: 'nav',
            },
            {
              code: 'editor',
              href: 'editor',
            },
          ],
        },
        {
          code: 'langs',
          href: 'langs',
          icon: 'languages',
        },
        {
          code: 'advanced',
          href: 'advanced/files',
          icon: 'cog',
          children: [
            {
              code: 'files',
              href: 'files',
            },
          ],
        },
      ],
    },
    {
      code: 'members',
      nav: [
        {
          code: 'users',
          href: 'users',
          icon: 'users',
        },
        {
          code: 'groups',
          href: 'groups',
          icon: 'group',
        },
        {
          code: 'staff',
          href: 'staff/moderators',
          icon: 'user-cog',
          children: [
            {
              code: 'moderators',
              href: 'moderators',
            },
            {
              code: 'administrators',
              href: 'administrators',
            },
          ],
        },
      ],
    },
  ];

  constructor(private readonly databaseService: DatabaseService) {}

  async show(): Promise<ShowAdminNavObj[]> {
    const adminNav = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (table, { asc }) => asc(table.created),
      columns: {
        code: true,
      },
    });

    const navFromPlugins = adminNav.map(({ code }) => {
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

    return [...this.coreNav, ...navFromPlugins].filter(
      plugin => plugin.nav.length > 0,
    );
  }
}
