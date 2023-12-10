import { Injectable } from '@nestjs/common';

import { EditAdminGroupsArgs } from './dto/edit-admin_groups.args';
import { ShowAdminGroups } from '../show/dto/show-admin_groups.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { NotFountError } from '@/utils/errors/not-found';
import { currentDate } from '@/functions/date';

@Injectable()
export class EditAdminGroupsService {
  constructor(private prisma: PrismaService) {}

  async edit({ id, name }: EditAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.prisma.core_groups.findUnique({
      where: {
        id
      }
    });

    if (!group) {
      throw new NotFountError('Group');
    }

    const groupNames = await this.prisma.core_groups_languages.findMany({
      where: {
        group_id: id
      }
    });

    // Update name languages
    const updatedName = await Promise.all(
      name.map(async item => {
        const nameExist = groupNames.find(name => name.id_language === item.id_language);

        if (nameExist) {
          // If value is empty, do nothing
          if (!nameExist.value.trim()) return;

          return await this.prisma.core_groups_languages.update({
            where: {
              id: nameExist.id
            },
            data: item
          });
        }

        return await this.prisma.core_groups_languages.create({
          data: {
            ...item,
            group_id: id
          }
        });
      })
    );

    // Check remaining languages
    Promise.all(
      groupNames.map(async item => {
        const nameExist = updatedName.find(name => name.id === item.id);
        if (nameExist) return;

        await this.prisma.core_groups_languages.delete({
          where: {
            id: item.id
          }
        });
      })
    );

    const users_count = await this.prisma.core_members.count({
      where: {
        group_id: id
      }
    });

    return {
      users_count,
      ...(await this.prisma.core_groups.update({
        where: {
          id
        },
        include: {
          name: true
        },
        data: {
          updated: currentDate()
        }
      }))
    };
  }
}
