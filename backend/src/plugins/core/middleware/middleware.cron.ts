import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { eq, lt, or } from "drizzle-orm";
import { ConfigService } from "@nestjs/config";

import { core_sessions_known_devices } from "@/plugins/core/admin/database/schema/sessions";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class CoreMiddlewareCron {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async clearKnowDevices() {
    const lastSeen = new Date();
    const lastSeenIn: number = this.configService.getOrThrow(
      "cookies.login_token.expiresInRemember"
    );
    lastSeen.setDate(lastSeen.getDate() - lastSeenIn);

    await this.databaseService.db
      .delete(core_sessions_known_devices)
      .where(
        or(
          eq(core_sessions_known_devices.ip_address, null),
          lt(core_sessions_known_devices.last_seen, lastSeen)
        )
      );
  }
}
