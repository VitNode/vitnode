import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { CustomError } from '@/utils/errors/CustomError';
import { ConfigType } from '@/types/config.type';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { currentDate } from '@/functions/date';
import { DatabaseService } from '@/database/database.service';
import { core_languages } from '@/src/admin/core/database/schema/languages';
import { core_groups, core_groups_names } from '@/src/admin/core/database/schema/groups';
import { core_admin_permissions } from '@/src/admin/core/database/schema/admins';

@Injectable()
export class CreateDatabaseAdminInstallService {
  constructor(private databaseService: DatabaseService) {}

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
    const languageCount = await this.databaseService.db
      .select({
        count: count()
      })
      .from(core_languages);
    if (languageCount[0].count > 0) {
      this.throwError();
    }

    await this.databaseService.db.insert(core_languages).values([
      {
        id: 'en',
        name: 'English',
        default: true,
        protected: true,
        timezone: 'America/New_York',
        created: currentDate()
      },
      {
        id: 'pl',
        name: 'Polski (Polish)',
        timezone: 'Europe/Warsaw',
        created: currentDate()
      }
    ]);

    // Create default groups
    const groupCount = await this.databaseService.db
      .select({
        count: count()
      })
      .from(core_groups);
    if (groupCount[0].count > 0) {
      this.throwError();
    }

    const guestGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        created: currentDate(),
        updated: currentDate(),
        protected: true,
        guest: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: guestGroup[0].id,
        language_id: 'en',
        value: 'Guest'
      },
      {
        group_id: guestGroup[0].id,
        language_id: 'pl',
        value: 'Gość'
      }
    ]);

    const memberGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        created: currentDate(),
        updated: currentDate(),
        protected: true,
        default: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: memberGroup[0].id,
        language_id: 'en',
        value: 'Member'
      },
      {
        group_id: memberGroup[0].id,
        language_id: 'pl',
        value: 'Użytkownik'
      }
    ]);

    const moderatorGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        created: currentDate(),
        updated: currentDate(),
        protected: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: moderatorGroup[0].id,
        language_id: 'en',
        value: 'Moderator'
      },
      {
        group_id: moderatorGroup[0].id,
        language_id: 'pl',
        value: 'Moderator'
      }
    ]);

    const adminGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        created: currentDate(),
        updated: currentDate(),
        protected: true,
        root: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: adminGroup[0].id,
        language_id: 'en',
        value: 'Administrator'
      },
      {
        group_id: adminGroup[0].id,
        language_id: 'pl',
        value: 'Administrator'
      }
    ]);

    await this.databaseService.db.insert(core_admin_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      created: currentDate(),
      updated: currentDate(),
      protected: true
    });

    return 'Success!';
  }
}
