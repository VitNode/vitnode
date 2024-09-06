import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_groups } from '@/database/schema/groups';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { ShowAdminGroups } from '../show/show.dto';
import { CreateAdminGroupsArgs } from './create.dto';

@Injectable()
export class CreateAdminGroupsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async create({
    content,
    name,
    color,
  }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    const [group] = await this.databaseService.db
      .insert(core_groups)
      .values({
        ...content,
        color: color ? color : null,
      })
      .returning();

    const groupNames = await this.stringLanguageHelper.parse({
      item_id: group.id,
      plugin_code: 'core',
      database: core_groups,
      data: name,
      variable: 'name',
    });

    return {
      ...group,
      name: groupNames,
      users_count: 0,
      content,
    };
  }
}
