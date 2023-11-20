import { Injectable } from '@nestjs/common';

import { ShowAdminGroups } from '../show/dto/show-admin_groups.obj';
import { CreateAdminGroupsArgs } from './dto/show-admin_groups.args';

import { PrismaService } from '@/prisma/prisma.service';
import { currentDate } from '@/functions/date';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class CreateAdminGroupsService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    if (!name.length) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'Name is required'
      });
    }

    return {
      ...(await this.prisma.core_groups.create({
        data: {
          name: {
            create: name
          },
          created: currentDate(),
          updated: currentDate()
        },
        include: {
          name: true
        }
      })),
      usersCount: 0
    };
  }
}
