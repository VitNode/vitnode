import { core_groups, core_groups_names } from '@/database/schema/groups';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { ParserStringLanguageCoreHelpersService } from '../../../helpers/text_language/parser/parser.service';
import { ShowAdminGroups } from '../show/show.dto';
import { CreateAdminGroupsArgs } from './create.dto';

@Injectable()
export class CreateAdminGroupsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserStringLanguageCoreHelpersService,
  ) {}

  async create({
    content,
    name,
    color,
  }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.databaseService.db
      .insert(core_groups)
      .values({
        ...content,
        color: color ? color : null,
      })
      .returning();

    const groupNames = await this.parserTextLang.parse({
      item_id: group[0].id,
      database: core_groups_names,
      data: name,
    });

    return {
      ...group[0],
      name: groupNames,
      users_count: 0,
      content,
    };
  }
}
