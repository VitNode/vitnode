import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";
import { AccessDeniedError } from "@vitnode/backend";

import {
  LayoutAdminInstallEnum,
  LayoutAdminInstallObj
} from "./dto/layout.obj";

import { core_users } from "@/plugins/core/admin/database/schema/users";
import { core_languages } from "@/plugins/core/admin/database/schema/languages";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class LayoutAdminInstallService {
  constructor(private readonly databaseService: DatabaseService) {}

  async layout(): Promise<LayoutAdminInstallObj> {
    const users = await this.databaseService.db
      .select({ count: count() })
      .from(core_users);
    if (users[0].count > 0) {
      throw new AccessDeniedError();
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
