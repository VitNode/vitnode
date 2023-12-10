import { Injectable } from '@nestjs/common';

import { CreateForumForumsArgs } from './dto/create-forum_forums.args';

import { ShowForumForumsWithParent } from '../../../../forums/forums/show/dto/show-forum_forums.obj';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateForumForumsService {
  constructor(private prisma: PrismaService) {}

  async create({
    description,
    is_category,
    name,
    parent_id
  }: CreateForumForumsArgs): Promise<ShowForumForumsWithParent> {
    if (!parent_id && !is_category) {
      throw new CustomError({
        code: 'FORUMS_CREATE_WITHOUT_CATEGORY',
        message: "You can't create a forum without a category"
      });
    }

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
        is_category,
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
