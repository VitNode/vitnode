import { Injectable } from "@nestjs/common";

import { CreateAdminNavArgs } from "./dto/create.args";

import { DatabaseService } from "@/plugins/database/database.service";
import {
  core_nav,
  core_nav_description,
  core_nav_name
} from "../../database/schema/nav";
import { ShowCoreNav } from "@/plugins/core/nav/show/dto/show.obj";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";

@Injectable()
export class CreateAdminNavService {
  constructor(
    private databaseService: DatabaseService,
    private parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async create({
    description,
    external,
    href,
    icon,
    name
  }: CreateAdminNavArgs): Promise<ShowCoreNav> {
    const theMostHighestPosition =
      await this.databaseService.db.query.core_nav.findFirst({
        where: (table, { eq }) => eq(table.parent_id, 0),
        orderBy: (table, { desc }) => desc(table.position)
      });

    const nav = await this.databaseService.db
      .insert(core_nav)
      .values({
        href,
        external,
        icon,
        position: theMostHighestPosition
          ? theMostHighestPosition.position + 1
          : 0
      })
      .returning();

    const id = nav[0].id;

    const namesNav = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_name,
      data: name
    });

    const descriptionNav = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_description,
      data: description
    });

    return {
      ...nav[0],
      name: namesNav,
      description: descriptionNav,
      children: []
    };
  }
}
