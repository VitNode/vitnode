import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lte } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

import { core_sessions_known_devices } from '../../database/schema/sessions';
import { DatabaseService } from '@/utils';

@Injectable()
export class CoreMiddlewareCron {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  // Clear known devices that have not been seen for 90 days
  async clearKnowDevices() {
    const lastSeen = new Date();
    const lastSeenInDeviceCookie: number = this.configService.getOrThrow(
      'cookies.known_device.expiresIn',
    );
    lastSeen.setDate(lastSeen.getDate() - lastSeenInDeviceCookie);

    await this.databaseService.db
      .delete(core_sessions_known_devices)
      .where(lte(core_sessions_known_devices.last_seen, lastSeen));
  }
}
