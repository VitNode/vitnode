import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { lte } from "drizzle-orm";

import { currentDate } from "@/src/functions/date";
import { DatabaseService } from "@/src/database/database.service";
import { core_sessions } from "@/src/modules/admin/core/database/schema/sessions";

@Injectable()
export class CoreSessionsCron {
  constructor(private databaseService: DatabaseService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async clearExpiredSessions() {
    await this.databaseService.db
      .delete(core_sessions)
      .where(lte(core_sessions.expires, currentDate()));
  }
}
