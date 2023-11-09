import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { LayoutAdminInstallEnum, LayoutAdminInstallObj } from './dto/layout-admin_install.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { ConfigType } from '@/types/config.type';

@Injectable()
export class LayoutAdminInstallService {
  constructor(private prisma: PrismaService) {}

  async layout(): Promise<LayoutAdminInstallObj> {
    const users = await this.prisma.core_members.count();
    if (users > 0) {
      throw new AccessDeniedError();
    }

    const languages = await this.prisma.core_languages.count();
    if (languages > 0) {
      return {
        status: LayoutAdminInstallEnum.ADMIN
      };
    }

    const configFile = fs.readFileSync(join('..', 'config.json'), 'utf8');
    const config: ConfigType = JSON.parse(configFile);

    if (!config.agree_terms) {
      return {
        status: LayoutAdminInstallEnum.DATABASE
      };
    }

    return {
      status: LayoutAdminInstallEnum.LICENSE
    };
  }
}
