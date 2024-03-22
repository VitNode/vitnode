import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { CustomError } from "@/utils/errors/CustomError";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DatabaseService } from "@/modules/database/database.service";
import { core_languages } from "@/modules/core/admin/database/schema/languages";
import {
  core_groups,
  core_groups_names
} from "@/modules/core/admin/database/schema/groups";
import { core_admin_permissions } from "@/modules/core/admin/database/schema/admins";
import { core_moderators_permissions } from "../../database/schema/moderators";
import { core_themes } from "../../database/schema/themes";
import { core_nav, core_nav_name } from "../../database/schema/nav";
import { getConfigFile } from "@/functions/config/get-config-file";
import { pluginPaths } from "../../plugins/paths";

@Injectable()
export class CreateDatabaseAdminInstallService {
  constructor(private databaseService: DatabaseService) {}

  protected throwError() {
    throw new CustomError({
      code: "DATABASE_ALREADY_EXISTS",
      message: "Database already exists."
    });
  }

  async create(): Promise<string> {
    const config = await getConfigFile();

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
        code: "en",
        name: "English (USA)",
        default: true,
        protected: true,
        timezone: "America/New_York",
        locale: "enUS"
      },
      {
        code: "pl",
        name: "Polski (Polish)",
        timezone: "Europe/Warsaw",
        time_24: true,
        locale: "pl"
      }
    ]);

    // Create plugins
    const coreVersions: { [version_code: number]: string } = JSON.parse(
      fs.readFileSync(pluginPaths({ code: "core" }).backend.versions, "utf8")
    );

    const coreVersionCode = +Object.keys(coreVersions).sort().reverse()[0];
    const coreVersion: string = coreVersions[coreVersionCode];

    // Create default theme
    await this.databaseService.db.insert(core_themes).values({
      name: "Default Theme",
      version: coreVersion,
      version_code: coreVersionCode,
      author: "VitNode",
      author_url: "https://vitnode.com/",
      support_url: "https://github.com/aXenDeveloper/vitnode/issues",
      protected: true,
      default: true
    });

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
        protected: true,
        guest: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: guestGroup[0].id,
        language_code: "en",
        value: "Guest"
      },
      {
        group_id: guestGroup[0].id,
        language_code: "pl",
        value: "Gość"
      }
    ]);

    const memberGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        default: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: memberGroup[0].id,
        language_code: "en",
        value: "Member"
      },
      {
        group_id: memberGroup[0].id,
        language_code: "pl",
        value: "Użytkownik"
      }
    ]);

    const moderatorGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: moderatorGroup[0].id,
        language_code: "en",
        value: "Moderator"
      },
      {
        group_id: moderatorGroup[0].id,
        language_code: "pl",
        value: "Moderator"
      }
    ]);

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: moderatorGroup[0].id,
      unrestricted: true,
      protected: true
    });

    const adminGroup = await this.databaseService.db
      .insert(core_groups)
      .values({
        protected: true,
        root: true
      })
      .returning();

    await this.databaseService.db.insert(core_groups_names).values([
      {
        group_id: adminGroup[0].id,
        language_code: "en",
        value: "Administrator"
      },
      {
        group_id: adminGroup[0].id,
        language_code: "pl",
        value: "Administrator"
      }
    ]);

    await this.databaseService.db.insert(core_admin_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      protected: true
    });

    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: adminGroup[0].id,
      unrestricted: true,
      protected: true
    });

    // Create navigation
    const nav = await this.databaseService.db
      .insert(core_nav)
      .values([
        {
          href: "/"
        },
        {
          href: "https://vitnode.com/",
          external: true
        }
      ])
      .returning();

    await this.databaseService.db.insert(core_nav_name).values([
      {
        nav_id: nav[0].id,
        language_code: "en",
        value: "Home"
      },
      {
        nav_id: nav[0].id,
        language_code: "pl",
        value: "Strona główna"
      },
      {
        nav_id: nav[1].id,
        language_code: "en",
        value: "VitNode"
      }
    ]);

    return "Success!";
  }
}
