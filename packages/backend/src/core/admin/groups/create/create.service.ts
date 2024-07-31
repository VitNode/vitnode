import { Injectable } from '@nestjs/common';

import { ShowAdminGroups } from '../show/dto/show.obj';
import { CreateAdminGroupsArgs } from './dto/create.args';

import { DatabaseService } from '@/utils/database/database.service';
import { ParserTextLanguageCoreHelpersService } from '../../../helpers/text_language/parser/parser.service';
import { core_groups, core_groups_names } from '@/database/schema/groups';

@Injectable()
export class CreateAdminGroupsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
  ) {}

  async create({
    content,
    name,
  }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.databaseService.db
      .insert(core_groups)
      .values({
        ...content,
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
