import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { ConfigType } from '@/types/config.type';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateDatabaseAdminInstallService {
  constructor(private prisma: PrismaService) {}

  protected throwError() {
    throw new CustomError({
      code: 'DATABASE_ALREADY_EXISTS',
      message: 'Database already exists.'
    });
  }

  async create(): Promise<string> {
    const configFile = fs.readFileSync(join('..', 'config.json'), 'utf8');
    const config: ConfigType = JSON.parse(configFile);

    if (config.finished_install) {
      throw new AccessDeniedError();
    }

    // Create default language
    const languageCount = await this.prisma.core_languages.count();
    if (languageCount > 0) {
      this.throwError();
    }

    await this.prisma.core_languages.createMany({
      data: [
        {
          id: 'en',
          name: 'English',
          default: true,
          protected: true,
          timezone: 'America/New_York',
          created: currentDate()
        },
        { id: 'pl', name: 'Polski (Polish)', timezone: 'Europe/Warsaw', created: currentDate() }
      ]
    });

    // Create default groups
    const groupCount = await this.prisma.core_groups.count();
    if (groupCount > 0) {
      this.throwError();
    }

    await this.prisma.$transaction([
      this.prisma.core_groups.create({
        data: {
          created: currentDate(),
          updated: currentDate(),
          protected: true,
          guest: true,
          name: {
            create: [
              {
                id_language: 'en',
                value: 'Guest'
              },
              {
                id_language: 'pl',
                value: 'Gość'
              }
            ]
          }
        }
      }),
      this.prisma.core_groups.create({
        data: {
          created: currentDate(),
          updated: currentDate(),
          name: {
            create: [
              {
                id_language: 'en',
                value: 'Moderator'
              },
              {
                id_language: 'pl',
                value: 'Moderator'
              }
            ]
          },
          moderator_permissions: {
            create: [
              {
                unrestricted: true,
                created: currentDate(),
                updated: currentDate(),
                protected: true
              }
            ]
          }
        }
      }),
      this.prisma.core_groups.create({
        data: {
          created: currentDate(),
          updated: currentDate(),
          protected: true,
          default: true,
          name: {
            create: [
              {
                id_language: 'en',
                value: 'Member'
              },
              {
                id_language: 'pl',
                value: 'Użytkownik'
              }
            ]
          }
        }
      }),
      this.prisma.core_groups.create({
        data: {
          created: currentDate(),
          updated: currentDate(),
          protected: true,
          root: true,
          name: {
            create: [
              {
                id_language: 'en',
                value: 'Administrator'
              },
              {
                id_language: 'pl',
                value: 'Administrator'
              }
            ]
          },
          admin_permissions: {
            create: [
              {
                unrestricted: true,
                created: currentDate(),
                updated: currentDate(),
                protected: true
              }
            ]
          },
          moderator_permissions: {
            create: [
              {
                unrestricted: true,
                created: currentDate(),
                updated: currentDate(),
                protected: true
              }
            ]
          }
        }
      })
    ]);

    return 'Success!';
  }
}
