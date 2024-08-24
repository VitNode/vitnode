import { core_groups, core_groups_names } from '@/database/schema/groups';
import { core_users } from '@/database/schema/users';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ParserTextLanguageCoreHelpersService } from '../../../helpers/text_language/parser/parser.service';
import { ShowAdminGroups } from '../show/dto/show.obj';
import { EditAdminGroupsArgs } from './dto/edit.args';

@Injectable()
export class EditAdminGroupsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
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

    await this.parserTextLang.parse({
      item_id: id,
      database: core_groups_names,
      data: name,
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
        with: {
          name: true,
        },
      });

    if (!updateGroup) {
      throw new NotFoundError('Group');
    }

    return {
      users_count: usersCount[0].count,
      ...updateGroup,
      content,
    };
  }
}
