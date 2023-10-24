import { Injectable } from '@nestjs/common';

import { CreateCoreGroupsArgs } from './dto/create-core_groups.args';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateCoreGroupsService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateCoreGroupsArgs) {
    return await this.prisma.core_groups.create({
      data: {
        name,
        created: currentDate()
      }
    });
  }
}
