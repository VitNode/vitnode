import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { EditCoreAdminLanguagesArgs } from "./dto/edit.args";

import { DatabaseService } from "../../../../database";
import { ShowCoreLanguages } from "../../../languages/show/dto/show.obj";
import { NotFoundError } from "../../../../errors";
import { core_languages } from "../../../../templates/core/admin/database/schema/languages";

@Injectable()
export class EditAdminCoreLanguagesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async edit({
    id,
    ...rest
  }: EditCoreAdminLanguagesArgs): Promise<ShowCoreLanguages> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.id, id)
      });

    if (!language) {
      throw new NotFoundError("Language");
    }

    // Edit default language
    if (rest.default) {
      // Disable previous default language
      await this.databaseService.db
        .update(core_languages)
        .set({ default: false })
        .where(eq(core_languages.default, true));
    }

    const editData = await this.databaseService.db
      .update(core_languages)
      .set({ ...rest, updated: new Date() })
      .where(eq(core_languages.id, id))
      .returning();

    const edit = editData[0];

    return edit;
  }
}
