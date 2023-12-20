import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';

@Injectable()
export class CoreMiddlewareCron {
  constructor(private prisma: PrismaService) {}

  @Cron('45 * * * * *')
  async clearKnowDevices() {
    // Delete all known devices without session and last seen more than 90 days ago
    await this.prisma.core_sessions_known_devices.deleteMany({
      where: {
        session: {
          is: null
        },
        last_seen: {
          lt: currentDate() - 60 * 60 * 24 * 90
        }
      }
    });
  }
}
