import { Injectable } from '@nestjs/common';

import { currentDate } from '@/functions/date';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePostsForumsArgs } from '@/src/forums/posts/create/dto/create.args';
import { ShowPostsForums } from '@/src/forums/posts/show/dto/show.obj';
import { Ctx } from '@/types/context.type';
import { User } from '@/utils/decorators/user.decorator';

@Injectable()
export class CreateForumsPostsService {
  constructor(private prisma: PrismaService) {}

  async create(
    { id }: User,
    { content, topic_id }: CreatePostsForumsArgs,
    { req }: Ctx
  ): Promise<ShowPostsForums> {
    const data = await this.prisma.forum_posts.create({
      data: {
        ip_address: req.ip,
        created: currentDate(),
        content: {
          create: content
        },
        topic: {
          connect: {
            id: topic_id
          }
        },
        author: {
          connect: {
            id
          }
        }
      },
      include: {
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
        }
      }
    });

    // Add post to timeline
    await this.prisma.forum_posts_timeline.create({
      data: {
        created: currentDate(),
        post: {
          connect: {
            id: data.id
          }
        }
      }
    });

    return data;
  }
}
