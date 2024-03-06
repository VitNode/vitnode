import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import {
  LayoutAdminInstallEnum,
  LayoutAdminInstallObj
} from "./dto/layout.obj";

import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DatabaseService } from "@/modules/database/database.service";
import { core_users } from "@/modules/admin/core/database/schema/users";
import { core_sessions } from "@/modules/admin/core/database/schema/sessions";
import { core_admin_sessions } from "@/modules/admin/core/database/schema/admins";
import { core_languages } from "@/modules/admin/core/database/schema/languages";

@Injectable()
export class LayoutAdminInstallService {
  constructor(private databaseService: DatabaseService) {}

  async layout(): Promise<LayoutAdminInstallObj> {
    const users = await this.databaseService.db
      .select({ count: count() })
      .from(core_users);
    if (users[0].count > 0) {
      const [sessionCount, sessionCountAdmin] = [
        await this.databaseService.db
          .select({ count: count() })
          .from(core_sessions),
        await this.databaseService.db
          .select({ count: count() })
          .from(core_admin_sessions)
      ];

      if (sessionCount[0].count > 0 || sessionCountAdmin[0].count > 0) {
        throw new AccessDeniedError();
      }

      return {
        status: LayoutAdminInstallEnum.FINISH
      };
    }

    const languages = await this.databaseService.db
      .select({ count: count() })
      .from(core_languages);
    if (languages[0].count > 0) {
      return {
        status: LayoutAdminInstallEnum.ACCOUNT
      };
    }

    return {
      status: LayoutAdminInstallEnum.DATABASE
    };
  }
}
