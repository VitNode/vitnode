import { Injectable } from '@nestjs/common';

import { LayoutAdminInstallEnum, LayoutAdminInstallObj } from './dto/layout.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';

@Injectable()
export class LayoutAdminInstallService {
  constructor(private prisma: PrismaService) {}

  async layout(): Promise<LayoutAdminInstallObj> {
    const users = await this.prisma.core_members.count();
    if (users > 0) {
      const [sessionCount, sessionCountAdmin] = await this.prisma.$transaction([
        this.prisma.core_sessions.count(),
        this.prisma.core_admin_sessions.count()
      ]);

      if (sessionCount > 0 || sessionCountAdmin > 0) {
        throw new AccessDeniedError();
      }

      return {
        status: LayoutAdminInstallEnum.FINISH
      };
    }

    const languages = await this.prisma.core_languages.count();
    if (languages > 0) {
      return {
        status: LayoutAdminInstallEnum.ACCOUNT
      };
    }

    return {
      status: LayoutAdminInstallEnum.DATABASE
    };
  }
}
