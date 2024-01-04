import { Injectable } from '@nestjs/common';

import { currentDate } from '@/functions/date';
import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';
import { User } from '@/utils/decorators/user.decorator';
import { LockToggleForumTopicsArgs } from '@/src/forum/topics/actions/lock_unlock/dto/lock_toggle.args';

@Injectable()
export class LockToggleForumTopicsService {
  constructor(private prisma: PrismaService) {}

  async lockToggle(
    { group, id: member_id }: User,
    { id }: LockToggleForumTopicsArgs,
    { req }: Ctx
  ): Promise<boolean> {
    return await this.prisma.$transaction(async prisma => {
      const topic = await prisma.forum_topics.findFirstOrThrow({
        where: {
          id
        }
      });

      // Check permissions
      await prisma.core_moderator_permissions.findFirstOrThrow({
        where: {
          AND: [
            {
              OR: [
                {
                  member: {
                    id: member_id
                  }
                },
                {
                  group: {
                    id: group.id
                  }
                }
              ]
            },
            {
              unrestricted: true
            }
          ]
        }
      });

      // Update topic
      await prisma.forum_topics.update({
        where: {
          id
        },
        data: {
          locked: !topic.locked
        }
      });

      // Create log and add log to timeline
      await this.prisma.forum_posts_timeline.create({
        data: {
          created: currentDate(),
          log: {
            create: {
              member: {
                connect: {
                  id: member_id
                }
              },
              topic: {
                connect: {
                  id
                }
              },
              created: currentDate(),
              action: topic.locked ? 'unlock' : 'lock',
              ip_address: req.ip
            }
          }
        }
      });

      return !topic.locked;
    });
  }
}
