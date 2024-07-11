import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { ChangePositionAdminNavStylesArgs } from './dto/change_position.args';

import { DatabaseService } from '@/utils/database/database.service';
import { NotFoundError } from '@/errors';
import { core_nav } from '@/plugins/core/admin/database/schema/nav';

@Injectable()
export class ChangePositionAdminNavStylesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async changePosition({
    id,
    index_to_move,
    parent_id,
  }: ChangePositionAdminNavStylesArgs): Promise<string> {
    const nav = await this.databaseService.db.query.core_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!nav) {
      throw new NotFoundError('Nav');
    }

    const allChildrenParent =
      await this.databaseService.db.query.core_nav.findMany({
        where: (table, { eq }) => eq(table.parent_id, parent_id),
        orderBy: (table, { asc }) => asc(table.position),
      });

    let index = 0;
    const newChildrenIndexes: { id: number; position: number }[] = [];
    allChildrenParent
      .filter(item => item.id !== id)
      .forEach(item => {
        // Skip the item that we want to move
        if (index_to_move === index) {
          index++;
        }

        newChildrenIndexes.push({
          id: item.id,
          position: index,
        });
        index++;
      });

    // If index_to_move is below 0, it means that the item is at the end of the list
    newChildrenIndexes.push({
      id,
      position: index_to_move < 0 ? index : index_to_move,
    });

    await Promise.all(
      newChildrenIndexes.map(async item => {
        await this.databaseService.db
          .update(core_nav)
          .set({
            position: item.position,
            parent_id,
          })
          .where(eq(core_nav.id, item.id));
      }),
    );

    return 'Success!';
  }
}
