import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { ChangePositionAdminPluginsArgs } from './dto/change_position.args';

import { DatabaseService } from '@/database/database.service';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { core_plugins } from '../../database/schema/plugins';

@Injectable()
export class ChangePositionAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async changeOrderingForumForums({ id, index_to_move }: ChangePositionAdminPluginsArgs) {
    const item = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!item) {
      throw new NotFoundError('Plugin');
    }

    if (item.position === index_to_move) {
      return 'You are trying to move the item to the same position';
    }

    const items = await this.databaseService.db.query.core_plugins.findMany({
      where: (table, { ne }) => ne(table.id, id)
    });

    let index = 0;
    const newIndexes: { id: number; position: number }[] = [];

    items.forEach(item => {
      // Skip the item that we want to move
      if (index_to_move === index) {
        index++;
      }

      newIndexes.push({
        id: item.id,
        position: index
      });
      index++;
    });

    newIndexes.push({
      id,
      position: index_to_move
    });

    await Promise.all(
      newIndexes.map(async item => {
        await this.databaseService.db
          .update(core_plugins)
          .set({
            position: item.position
          })
          .where(eq(core_plugins.id, item.id));
      })
    );

    return 'Success!';
  }
}
