import { Injectable } from '@nestjs/common';

import { ShowAdminStaffModerators } from '../show/dto/show.obj';
import { CreateAdminStaffModeratorsArgs } from './dto/create.args';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateAdminStaffModeratorsService {
  constructor(private prisma: PrismaService) {}

  async create({
    group_id,
    member_id,
    unrestricted
  }: CreateAdminStaffModeratorsArgs): Promise<ShowAdminStaffModerators> {
    if (!group_id && !member_id) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'You must provide either a group_id or a member_id.'
      });
    }

    const findPermission = await this.prisma.core_moderator_permissions.findFirst({
      where: {
        OR: [
          {
            member_id: member_id
          },
          {
            group_id: group_id
          }
        ]
      }
    });

    if (findPermission) {
      throw new CustomError({
        code: 'ALREADY_EXISTS',
        message: 'This user or group already has moderator permissions.'
      });
    }

    const connectIfDefined = (id: string) => (id ? { connect: { id } } : undefined);

    const data = await this.prisma.core_moderator_permissions.create({
      data: {
        unrestricted,
        created: currentDate(),
        updated: currentDate(),
        member: connectIfDefined(member_id),
        group: connectIfDefined(group_id)
      },
      include: {
        member: {
          include: {
            avatar: true,
            cover: true,
            group: {
              include: {
                name: true
              }
            }
          }
        },
        group: {
          include: {
            name: true
          }
        }
      }
    });

    if (data.member) {
      return {
        ...data,
        user_or_group: {
          ...data.member
        }
      };
    }

    return {
      ...data,
      user_or_group: {
        ...data.group,
        group_name: data.group.name
      }
    };
  }
}
