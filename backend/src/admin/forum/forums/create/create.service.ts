import { Injectable } from '@nestjs/common';

import { CreateForumForumsArgs } from './dto/create.args';

import { ShowForumForumsWithParent } from '../../../../forums/forums/show/dto/show.obj';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { currentDate } from '@/functions/date';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class CreateForumForumsService {
  constructor(private prisma: PrismaService) {}

  async create({
    description,
    name,
    parent_id,
    permissions
  }: CreateForumForumsArgs): Promise<ShowForumForumsWithParent> {
    if (parent_id) {
      const parent = await this.prisma.forum_forums.findUnique({
        where: {
          id: parent_id
        }
      });

      if (!parent) {
        throw new CustomError({
          code: 'FORUMS_PARENT_NOT_FOUND',
          message: 'Parent not found'
        });
      }
    }

    const theMostHighestPosition = await this.prisma.forum_forums.findFirst({
      where: {
        parent_id: parent_id || null
      },
      orderBy: {
        position: 'desc'
      }
    });

    const forum = await this.prisma.forum_forums.create({
      data: {
        name: {
          create: name
        },
        description: {
          create: description
        },
        position: theMostHighestPosition ? theMostHighestPosition.position + 1 : 0,
        created: currentDate(),
        parent: parent_id
          ? {
              connect: {
                id: parent_id
              }
            }
          : undefined,
        can_all_create: permissions.can_all_create,
        can_all_read: permissions.can_all_read,
        can_all_reply: permissions.can_all_reply,
        can_all_view: permissions.can_all_view,
        permissions: {
          createMany: {
            data: permissions.groups.map(group => ({
              group_id: group.id,
              can_create: group.create,
              can_read: group.read,
              can_reply: group.reply,
              can_view: group.view
            }))
          }
        }
      },
      include: {
        name: true,
        description: true,
        parent: {
          include: {
            name: true,
            description: true,
            _count: {
              select: {
                children: true
              }
            }
          }
        },
        children: {
          orderBy: [
            {
              position: SortDirectionEnum.asc
            }
          ],
          include: {
            name: true,
            description: true,
            _count: {
              select: {
                children: true
              }
            },
            children: {
              orderBy: [
                {
                  position: SortDirectionEnum.asc
                }
              ],
              include: {
                name: true,
                description: true,
                _count: {
                  select: {
                    children: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            children: true
          }
        }
      }
    });

    return forum;
  }
}
