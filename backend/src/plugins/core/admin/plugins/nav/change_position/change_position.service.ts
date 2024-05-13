import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { ChangePositionAdminNavPluginsArgs } from "./dto/change_position.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins_nav } from "../../../database/schema/plugins";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class ChangePositionAdminNavPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async changePosition({
    id,
    index_to_move
  }: ChangePositionAdminNavPluginsArgs): Promise<string> {
    const nav = await this.databaseService.db.query.core_plugins_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!nav) {
      throw new NotFoundError("Plugin Nav");
    }

    const getAllNav =
      await this.databaseService.db.query.core_plugins_nav.findMany({
        where: (table, { eq }) => eq(table.plugin_id, nav.plugin_id),
        orderBy: (table, { asc }) => asc(table.position)
      });

    let index = 0;
    const newIndexes: { id: number; position: number }[] = [];
    getAllNav
      .filter(item => item.id !== id)
      .forEach(item => {
        // Skip the item that we want to move
        if (index_to_move === index) {
          index++;
        }

        newIndexes.push({
          id: item.id,
          position: index
        });
        index++;
      });

    newIndexes.push({
      id,
      position: index_to_move < 0 ? index : index_to_move
    });

    await Promise.all(
      newIndexes.map(async item => {
        await this.databaseService.db
          .update(core_plugins_nav)
          .set({
            position: item.position
          })
          .where(eq(core_plugins_nav.id, item.id));
      })
    );

    return "Success!";
  }
}
