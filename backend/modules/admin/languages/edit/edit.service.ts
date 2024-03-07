import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { EditCoreAdminLanguagesArgs } from "./dto/edit.args";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_languages } from "@/modules/admin/database/schema/languages";
import { ShowCoreLanguages } from "@/modules/core/languages/show/dto/show.obj";

@Injectable()
export class EditAdminCoreLanguagesService {
  constructor(private databaseService: DatabaseService) {}

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
      .set(rest)
      .where(eq(core_languages.id, id))
      .returning();

    const edit = editData[0];

    return edit;
  }
}
