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
    parent_id
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
          : undefined
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
