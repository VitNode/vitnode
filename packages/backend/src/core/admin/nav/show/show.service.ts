import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ShowAdminNavObj } from './show.dto';

@Injectable()
export class ShowAdminNavService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  readonly coreNav: ShowAdminNavObj[] = [
    {
      code: 'core',
      nav: [
        {
          code: 'dashboard',
          icon: 'layout-dashboard',
          keywords: [],
        },
        {
          code: 'settings',
          icon: 'settings',
          keywords: [],
          children: [
            {
              code: 'general',
              keywords: ['name', 'title', 'description', 'desc', 'copyright'],
            },
            {
              code: 'security',
              keywords: ['captcha'],
            },
            {
              code: 'metadata',
              keywords: ['manifest', 'pwa', 'seo'],
            },
            {
              code: 'email',
              keywords: ['email', 'e-mail', 'mail', 'smtp'],
            },
            {
              code: 'authorization',
              keywords: [
                'authorization',
                'auth',
                'login',
                'register',
                'force login',
                'sign in',
                'sign up',
              ],
            },
            {
              code: 'legal',
              keywords: ['legal', 'terms', 'privacy', 'policy', 'tos', 'pp'],
            },
          ],
        },
        {
          code: 'plugins',
          icon: 'plug',
          keywords: ['plug', 'plugin'],
        },
        {
          code: 'styles',
          icon: 'paintbrush',
          keywords: [],
          children: [
            {
              code: 'theme-editor',
              keywords: ['theme', 'editor', 'color', 'logo'],
            },
            {
              code: 'nav',
              keywords: ['nav', 'navigation'],
            },
            {
              code: 'editor',
              keywords: ['editor', 'tiptap'],
            },
          ],
        },
        {
          code: 'langs',
          icon: 'languages',
          keywords: ['language'],
        },
        {
          code: 'advanced',
          icon: 'cog',
          keywords: [],
          children: [
            {
              code: 'files',
              keywords: ['file'],
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
          icon: 'users',
          keywords: ['user'],
        },
        {
          code: 'groups',
          icon: 'group',
          keywords: ['group', 'permission', 'file', 'upload', 'storage'],
        },
        {
          code: 'staff',
          icon: 'user-cog',
          keywords: [],
          children: [
            {
              code: 'moderators',
              keywords: [],
            },
            {
              code: 'administrators',
              keywords: [],
            },
          ],
        },
      ],
    },
  ];

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
