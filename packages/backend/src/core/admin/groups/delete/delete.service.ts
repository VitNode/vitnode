import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_groups } from '@/database/schema/groups';
import { core_users } from '@/database/schema/users';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DeleteAdminGroupsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async delete({ id }: { id: number }): Promise<string> {
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

    await this.stringLanguageHelper.delete({
      database: core_groups,
      item_id: group.id,
      plugin_code: 'core',
    });

    return 'Success!';
  }
}
