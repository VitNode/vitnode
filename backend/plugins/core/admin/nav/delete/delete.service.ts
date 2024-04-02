import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DeleteAdminNavArgs } from "./dto/delete.args";

import { DatabaseService } from "@/plugins/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_nav } from "../../database/schema/nav";

@Injectable()
export class DeleteAdminNavService {
  constructor(private databaseService: DatabaseService) {}

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

    // Delete nav
    await this.databaseService.db.delete(core_nav).where(eq(core_nav.id, id));

    return "Success!";
  }
}
