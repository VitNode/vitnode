import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_admin_permissions } from '@/database/schema/admins';
import { core_groups } from '@/database/schema/groups';
import { core_languages } from '@/database/schema/languages';
import { core_moderators_permissions } from '@/database/schema/moderators';
import { CustomError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

@Injectable()
export class CreateDatabaseAdminInstallService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

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

    const [guestGroup] = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        guest: true,
        files_allow_upload: false,
      })
      .returning();

    await this.stringLanguageHelper.parse({
      item_id: guestGroup.id,
      plugin_code: 'core',
      database: core_groups,
      data: [
        {
          language_code: 'en',
          value: 'Guest',
        },
      ],
      variable: 'name',
    });

    const [memberGroup] = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        default: true,
      })
      .returning();

    await this.stringLanguageHelper.parse({
      item_id: memberGroup.id,
      plugin_code: 'core',
      database: core_groups,
      data: [
        {
          language_code: 'en',
          value: 'Member',
        },
      ],
      variable: 'name',
    });

    const [moderatorGroup] = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        color: 'hsl(122, 80%, 45%)',
      })
      .returning();

    await this.stringLanguageHelper.parse({
      item_id: moderatorGroup.id,
      plugin_code: 'core',
      database: core_groups,
      data: [
        {
          language_code: 'en',
          value: 'Moderator',
        },
      ],
      variable: 'name',
    });

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: moderatorGroup.id,
      unrestricted: true,
      protected: true,
    });

    const [adminGroup] = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        root: true,
        color: 'hsl(0, 100%, 50%)',
      })
      .returning();

    await this.stringLanguageHelper.parse({
      item_id: adminGroup.id,
      plugin_code: 'core',
      database: core_groups,
      data: [
        {
          language_code: 'en',
          value: 'Administrator',
        },
      ],
      variable: 'name',
    });

    await this.databaseService.db.insert(core_admin_permissions).values({
      group_id: adminGroup.id,
      unrestricted: true,
      protected: true,
    });

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: adminGroup.id,
      unrestricted: true,
      protected: true,
    });

    return 'Success!';
  }
}
