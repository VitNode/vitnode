import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '@/index';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ShowAdminNavObj } from './dto/show.obj';

@Injectable()
export class ShowAdminNavService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  readonly coreNav: ShowAdminNavObj[] = [
    {
      code: 'core',
      nav: [
        {
          code: 'dashboard',
          href: 'dashboard',
          icon: 'layout-dashboard',
          keywords: [],
        },
        {
          code: 'settings',
          href: 'settings/general',
          icon: 'settings',
          keywords: [],
          children: [
            {
              code: 'general',
              href: 'general',
              keywords: ['name', 'title', 'description', 'desc', 'copyright'],
            },
            {
              code: 'security',
              href: 'security',
              keywords: ['captcha'],
            },
            {
              code: 'metadata',
              href: 'metadata',
              keywords: ['manifest', 'pwa', 'seo'],
            },
            {
              code: 'email',
              href: 'email',
              keywords: ['email', 'e-mail', 'mail', 'smtp'],
            },
            {
              code: 'authorization',
              href: 'authorization',
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
              href: 'legal',
              keywords: ['legal', 'terms', 'privacy', 'policy', 'tos', 'pp'],
            },
          ],
        },
        {
          code: 'plugins',
          href: 'plugins',
          icon: 'plug',
          keywords: ['plug', 'plugin'],
        },
        {
          code: 'styles',
          href: 'styles/nav',
          icon: 'paintbrush',
          keywords: [],
          children: [
            {
              code: 'theme-editor',
              href: '/theme-editor',
              keywords: ['theme', 'editor', 'color', 'logo'],
            },
            {
              code: 'nav',
              href: 'nav',
              keywords: ['nav', 'navigation'],
            },
            {
              code: 'editor',
              href: 'editor',
              keywords: ['editor', 'tiptap'],
            },
          ],
        },
        {
          code: 'langs',
          href: 'langs',
          icon: 'languages',
          keywords: ['language'],
        },
        {
          code: 'advanced',
          href: 'advanced/files',
          icon: 'cog',
          keywords: [],
          children: [
            {
              code: 'files',
              href: 'files',
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
          href: 'users',
          icon: 'users',
          keywords: ['user'],
        },
        {
          code: 'groups',
          href: 'groups',
          icon: 'group',
          keywords: ['group', 'permission', 'file', 'upload', 'storage'],
        },
        {
          code: 'staff',
          href: 'staff/moderators',
          icon: 'user-cog',
          keywords: [],
          children: [
            {
              code: 'moderators',
              href: 'moderators',
              keywords: [],
            },
            {
              code: 'administrators',
              href: 'administrators',
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
