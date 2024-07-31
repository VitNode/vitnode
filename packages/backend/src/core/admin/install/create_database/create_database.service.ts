import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { DatabaseService } from '@/utils/database/database.service';
import { CustomError } from '@/errors';
import { core_languages } from '@/database/schema/languages';
import { core_groups, core_groups_names } from '@/database/schema/groups';
import { core_admin_permissions } from '@/database/schema/admins';
import { core_nav, core_nav_name } from '@/database/schema/nav';
import { core_moderators_permissions } from '@/database/schema/moderators';

@Injectable()
export class CreateDatabaseAdminInstallService {
  constructor(private readonly databaseService: DatabaseService) {}

  protected throwError() {
    throw new CustomError({
      code: 'DATABASE_ALREADY_EXISTS',
      message: 'Database already exists.',
    });
  }

  async create(): Promise<string> {
    // Create default language
    const languageCount = await this.databaseService.db
      .select({
        count: count(),
      })
      .from(core_languages);
    if (languageCount[0].count > 0) {
      this.throwError();
    }

    await this.databaseService.db.insert(core_languages).values([
      {
        code: 'en',
        name: 'English (USA)',
        default: true,
        protected: true,
        timezone: 'America/New_York',
        locale: 'enUS',
      },
    ]);

    // Create default groups
    const groupCount = await this.databaseService.db
      .select({
        count: count(),
      })
      .from(core_groups);
    if (groupCount[0].count > 0) {
      this.throwError();
    }

    const guestGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        guest: true,
        files_allow_upload: false,
        files_total_max_storage: -1,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: guestGroup[0].id,
        language_code: 'en',
        value: 'Guest',
      },
    ]);

    const memberGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        default: true,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: memberGroup[0].id,
        language_code: 'en',
        value: 'Member',
      },
    ]);

    const moderatorGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: moderatorGroup[0].id,
        language_code: 'en',
        value: 'Moderator',
      },
    ]);

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: moderatorGroup[0].id,
      unrestricted: true,
      protected: true,
    });

    const adminGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        root: true,
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        item_id: adminGroup[0].id,
        language_code: 'en',
        value: 'Administrator',
      },
    ]);

    await this.databaseService.db.insert(core_admin_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      protected: true,
    });

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      protected: true,
    });

    return 'Success!';
  }
}
