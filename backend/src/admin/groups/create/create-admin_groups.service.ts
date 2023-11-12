import { Injectable } from '@nestjs/common';

import { CreateAdminGroupsArgs } from './dto/create-admin_groups.args';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateAdminGroupsService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateAdminGroupsArgs) {
    return await this.prisma.core_groups.create({
      data: {
        name,
        created: currentDate()
      }
    });
  }
}
