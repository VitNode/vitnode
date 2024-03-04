import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { eq, lt, or } from "drizzle-orm";
import { ConfigService } from "@nestjs/config";

import { currentDate } from "@/functions/date";
import { DatabaseService } from "@/database/database.service";
import { core_sessions_known_devices } from "@/apps/admin/core/database/schema/sessions";

@Injectable()
export class CoreMiddlewareCron {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async clearKnowDevices() {
    await this.databaseService.db
      .delete(core_sessions_known_devices)
      .where(
        or(
          eq(core_sessions_known_devices.ip_address, null),
          lt(
            core_sessions_known_devices.last_seen,
            currentDate() -
              this.configService.getOrThrow(
                "cookies.login_token.expiresInRemember"
              )
          )
        )
      );
  }
}
