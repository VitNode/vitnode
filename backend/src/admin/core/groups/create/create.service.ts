import { Injectable } from '@nestjs/common';

import { ShowAdminGroups } from '../show/dto/show.obj';
import { CreateAdminGroupsArgs } from './dto/create.args';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class CreateAdminGroupsService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    const transformName = name.filter(item => item.value.trim().length > 0);

    if (!transformName.length) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'Name is required'
      });
    }

    return {
      ...(await this.prisma.core_groups.create({
        data: {
          name: {
            create: transformName
          },
          created: currentDate(),
          updated: currentDate()
        },
        include: {
          name: true
        }
      })),
      users_count: 0
    };
  }
}
