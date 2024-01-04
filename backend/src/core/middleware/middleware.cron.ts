import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';
import { CONFIG } from '@/config';

@Injectable()
export class CoreMiddlewareCron {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async clearKnowDevices() {
    await this.prisma.core_sessions_known_devices.deleteMany({
      where: {
        AND: [
          {
            session: {
              is: null
            }
          },
          {
            last_seen: {
              lt: currentDate() - CONFIG.cookies.login_token.expiresInRemember
            }
          }
        ],
        OR: [
          {
            ip_address: null
          }
        ]
      }
    });
  }
}
