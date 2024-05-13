import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { lte } from "drizzle-orm";

import { core_sessions } from "@/plugins/core/admin/database/schema/sessions";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class CoreSessionsCron {
  constructor(private databaseService: DatabaseService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async clearExpiredSessions() {
    await this.databaseService.db
      .delete(core_sessions)
      .where(lte(core_sessions.expires, new Date()));
  }
}
