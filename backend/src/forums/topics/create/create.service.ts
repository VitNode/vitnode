import { Injectable } from '@nestjs/common';

import { CreateForumTopicsArgs } from './dto/create.args';
import { ShowTopicsForums } from '../show/dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { NotFountError } from '@/utils/errors/not-found';
import { currentDate } from '@/functions/date';
import { User } from '@/utils/decorators/user.decorator';

@Injectable()
export class CreateForumTopicsService {
  constructor(private prisma: PrismaService) {}

  async create(
    { id }: User,
    { content, forum_id, title }: CreateForumTopicsArgs
  ): Promise<ShowTopicsForums> {
    const forum = await this.prisma.forum_forums.findUnique({
      where: {
        id: forum_id
      }
    });

    if (!forum) {
      throw new NotFountError('Forum');
    }

    const topic = await this.prisma.forum_topics.create({
      data: {
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
            avatar: true
          }
        }
      }
    });

    return topic;
  }
}
