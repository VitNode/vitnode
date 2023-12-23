import { Injectable } from '@nestjs/common';

import { CreateForumTopicsArgs } from './dto/create.args';
import { ShowTopicsForums } from '../show/dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { NotFountError } from '@/utils/errors/not-found';
import { currentDate } from '@/functions/date';
import { User } from '@/utils/decorators/user.decorator';
import { Ctx } from '@/types/context.type';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';

@Injectable()
export class CreateForumTopicsService {
  constructor(private prisma: PrismaService) {}

  async create(
    { group, id }: User,
    { content, forum_id, title }: CreateForumTopicsArgs,
    { req }: Ctx
  ): Promise<ShowTopicsForums> {
    const forum = await this.prisma.forum_forums.findUnique({
      where: {
        id: forum_id
      },
      include: {
        permissions: {
          where: {
            group_id: group.id
          }
        }
      }
    });

    if (!(forum.permissions.at(0)?.can_create || forum.can_all_create)) {
      throw new AccessDeniedError();
    }

    if (!forum) {
      throw new NotFountError('Forum');
    }

    const topic = await this.prisma.forum_topics.create({
      data: {
        ip_address: req.ip,
        forum: {
          connect: {
            id: forum_id
          }
        },
        title: {
          create: title
        },
        content: {
          create: content
        },
        created: currentDate(),
        author: {
          connect: {
            id
          }
        }
      },
      include: {
        title: true,
        content: true,
        author: {
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
        forum: {
          include: {
            name: true
          }
        }
      }
    });

    return topic;
  }
}
