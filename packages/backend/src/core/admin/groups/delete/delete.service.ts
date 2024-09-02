import { core_groups } from '@/database/schema/groups';
import { core_users } from '@/database/schema/users';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DeleteAdminGroupsArgs } from './delete.dto';

@Injectable()
export class DeleteAdminGroupsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async delete({ id }: DeleteAdminGroupsArgs): Promise<string> {
    const group = await this.databaseService.db.query.core_groups.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!group) {
      throw new NotFoundError('Group');
    }

    // Find default group
    const defaultGroup =
      await this.databaseService.db.query.core_groups.findFirst({
        where: (table, { eq }) => eq(table.default, true),
      });

    if (!defaultGroup) {
      throw new NotFoundError('Default group');
    }

    // Move users to default group
    await this.databaseService.db
      .update(core_users)
      .set({
        group_id: defaultGroup.id,
      })
      .where(eq(core_users.group_id, id));

    // Delete group
    await this.databaseService.db
      .delete(core_groups)
      .where(eq(core_groups.id, id));

    return 'Success!';
  }
}
