import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_groups } from '@/database/schema/groups';
import { core_users } from '@/database/schema/users';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowAdminGroups } from '../show/show.dto';
import { EditAdminGroupsArgs } from './edit.dto';

@Injectable()
export class EditAdminGroupsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async edit({
    content,
    id,
    name,
    color,
  }: EditAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.databaseService.db.query.core_groups.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!group) {
      throw new NotFoundError('Group');
    }

    const groupNames = await this.stringLanguageHelper.parse({
      item_id: group.id,
      plugin_code: 'core',
      database: core_groups,
      data: name,
      variable: 'name',
    });

    const usersCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(eq(core_users.group_id, id));

    await this.databaseService.db
      .update(core_groups)
      .set({
        updated: new Date(),
        color: color ? color : null,
        ...content,
      })
      .where(eq(core_groups.id, id))
      .returning();

    const updateGroup =
      await this.databaseService.db.query.core_groups.findFirst({
        where: (table, { eq }) => eq(table.id, id),
      });

    if (!updateGroup) {
      throw new NotFoundError('Group');
    }

    return {
      users_count: usersCount[0].count,
      ...updateGroup,
      name: groupNames,
      content,
    };
  }
}
