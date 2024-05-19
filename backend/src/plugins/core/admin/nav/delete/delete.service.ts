import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DeleteAdminNavArgs } from "./dto/delete.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import {
  core_nav,
  core_nav_description,
  core_nav_name
} from "../../database/schema/nav";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class DeleteAdminNavService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async delete({ id }: DeleteAdminNavArgs): Promise<string> {
    const nav = await this.databaseService.db.query.core_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!nav) {
      throw new NotFoundError("Nav");
    }

    // Update parent_id to 0
    await this.databaseService.db
      .update(core_nav)
      .set({ parent_id: 0 })
      .where(eq(core_nav.parent_id, id));

    await this.parserTextLang.delete({
      database: core_nav_name,
      item_id: id
    });

    await this.parserTextLang.delete({
      database: core_nav_description,
      item_id: id
    });

    // Delete nav
    await this.databaseService.db.delete(core_nav).where(eq(core_nav.id, id));

    return "Success!";
  }
}
