import { Injectable } from '@nestjs/common';

import { ChangePositionForumForumsArgs } from './dto/change_position-forum_forums.args';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { SortDirectionEnum } from '../../../../types/database/sortDirection.type';

@Injectable()
export class ChangePositionForumForumsService {
  constructor(private prisma: PrismaService) {}

  async changeOrderingForumForums({ id, index_to_move, parent_id }: ChangePositionForumForumsArgs) {
    const item = await this.prisma.forum_forums.findUnique({
      where: { id }
    });

    if (!item) {
      throw new CustomError({
        code: 'FORUM_FORUMS_NOT_FOUND',
        message: 'Forum forum not found'
      });
    }

    const allChildrenParent = await this.prisma.forum_forums.findMany({
      where: {
        parent_id
      },
      orderBy: {
        position: SortDirectionEnum.asc
      }
    });

    let index = 0;
    const newChildrenIndexes: { id: string; position: number }[] = [];
    allChildrenParent
      .filter(item => item.id !== id)
      .forEach(item => {
        // Skip the item that we want to move
        if (index_to_move === index) {
          index++;
        }

        newChildrenIndexes.push({
          id: item.id,
          position: index
        });
        index++;
      });

    // If index_to_move is below 0, it means that the item is at the end of the list
    newChildrenIndexes.push({
      id,
      position: index_to_move < 0 ? index : index_to_move
    });

    await Promise.all(
      newChildrenIndexes.map(async item => {
        await this.prisma.forum_forums.update({
          where: { id: item.id },
          data: {
            position: item.position,
            parent: parent_id ? { connect: { id: parent_id } } : { disconnect: true }
          }
        });
      })
    );

    return 'Success!';
  }
}
