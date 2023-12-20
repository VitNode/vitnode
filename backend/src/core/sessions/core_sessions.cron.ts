import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';

@Injectable()
export class CoreSessionsCron {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async clearExpiredSessions() {
    await this.prisma.core_sessions.deleteMany({
      where: {
        expires: {
          lte: currentDate()
        }
      }
    });
  }
}
