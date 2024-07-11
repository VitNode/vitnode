import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { and, lte } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

import { core_sessions } from '../../plugins/core/admin/database/schema/sessions';
import { core_admin_sessions } from '../../plugins/core/admin/database/schema/admins';
import { DatabaseService } from '@/utils';

@Injectable()
export class CoreSessionsCron {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async clearExpiredSessions() {
    const expiresIn = new Date();
    const expiresInDeviceCookie: number = this.configService.getOrThrow(
      'cookies.known_device.expiresIn',
    );
    expiresIn.setDate(expiresIn.getDate() - expiresInDeviceCookie);

    await this.databaseService.db
      .delete(core_sessions)
      .where(
        and(
          lte(core_sessions.expires, new Date()),
          lte(core_sessions.created, expiresIn),
        ),
      );

    // Clear admin sessions
    await this.databaseService.db
      .delete(core_admin_sessions)
      .where(
        and(
          lte(core_admin_sessions.expires, new Date()),
          lte(core_admin_sessions.created, expiresIn),
        ),
      );
  }
}
