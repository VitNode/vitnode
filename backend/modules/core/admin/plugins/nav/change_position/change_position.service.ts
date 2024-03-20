import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { ChangePositionAdminNavPluginsArgs } from "./dto/change_position.args";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins_nav } from "../../../database/schema/plugins";

@Injectable()
export class ChangePositionAdminNavPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async changePosition({
    code,
    index_to_move
  }: ChangePositionAdminNavPluginsArgs): Promise<string> {
    const nav = await this.databaseService.db.query.core_plugins_nav.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!nav) {
      throw new NotFoundError("Plugin Nav");
    }

    const getAllNav =
      await this.databaseService.db.query.core_plugins_nav.findMany({
        orderBy: (table, { asc }) => asc(table.position)
      });

    let index = 0;
    const newIndexes: { code: string; position: number }[] = [];
    getAllNav
      .filter(item => item.code !== code)
      .forEach(item => {
        // Skip the item that we want to move
        if (index_to_move === index) {
          index++;
        }

        newIndexes.push({
          code: item.code,
          position: index
        });
        index++;
      });

    await Promise.all(
      newIndexes.map(async item => {
        await this.databaseService.db
          .update(core_plugins_nav)
          .set({
            position: item.position
          })
          .where(eq(core_plugins_nav.code, item.code));
      })
    );

    return "Success!";
  }
}
