import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { EditAdminNavArgs } from "./dto/edit.args";

import { DatabaseService } from "@/src/database/database.service";
import { ShowCoreNav } from "@/src/modules/core/nav/show/dto/show.obj";
import { NotFoundError } from "@/src/utils/errors/not-found-error";
import {
  core_nav,
  core_nav_description,
  core_nav_name
} from "../../database/schema/nav";

@Injectable()
export class EditAdminNavService {
  constructor(private databaseService: DatabaseService) {}

  protected async updateNames({
    id,
    name
  }: Pick<EditAdminNavArgs, "name" | "id">) {
    const names = await this.databaseService.db.query.core_nav_name.findMany({
      where: (table, { eq }) => eq(table.nav_id, id)
    });

    const update = await Promise.all(
      name.map(async item => {
        const itemExist = names.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          // If value is empty, do nothing
          if (!itemExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(core_nav_name)
            .set({ ...item, nav_id: id })
            .where(eq(core_nav_name.id, itemExist.id))
            .returning();

          return update[0];
        }

        const insert = await this.databaseService.db
          .insert(core_nav_name)
          .values({ ...item, nav_id: id })
          .returning();

        return insert[0];
      })
    );

    // Delete
    Promise.all(
      names.map(async item => {
        const exist = update.find(name => name.id === item.id);
        if (exist) return;

        await this.databaseService.db
          .delete(core_nav_name)
          .where(eq(core_nav_name.id, item.id));
      })
    );

    return update;
  }

  protected async updateDescriptions({
    description,
    id
  }: Pick<EditAdminNavArgs, "description" | "id">) {
    const descriptions =
      await this.databaseService.db.query.core_nav_description.findMany({
        where: (table, { eq }) => eq(table.nav_id, id)
      });

    const update = await Promise.all(
      description.map(async item => {
        const itemExist = descriptions.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          // If value is empty, do nothing
          if (!itemExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(core_nav_description)
            .set({ ...item, nav_id: id })
            .where(eq(core_nav_description.id, itemExist.id))
            .returning();

          return update[0];
        }

        const insert = await this.databaseService.db
          .insert(core_nav_description)
          .values({ ...item, nav_id: id })
          .returning();

        return insert[0];
      })
    );

    // Delete
    Promise.all(
      descriptions.map(async item => {
        const exist = update.find(name => name.id === item.id);
        if (exist) return;

        await this.databaseService.db
          .delete(core_nav_description)
          .where(eq(core_nav_description.id, item.id));
      })
    );

    return update;
  }

  async edit({
    description,
    external,
    href,
    id,
    name
  }: EditAdminNavArgs): Promise<ShowCoreNav> {
    const nav = await this.databaseService.db.query.core_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!nav) {
      throw new NotFoundError("Nav");
    }

    const updatedNav = await this.databaseService.db
      .update(core_nav)
      .set({
        href,
        external
      })
      .where(eq(core_nav.id, id))
      .returning();

    const updatedName = await this.updateNames({ id, name });
    const updatedDescription = await this.updateDescriptions({
      id,
      description
    });

    const children = await this.databaseService.db.query.core_nav.findMany({
      where: (table, { eq }) => eq(table.parent_id, id),
      with: {
        name: true,
        description: true
      }
    });

    return {
      ...updatedNav[0],
      name: updatedName,
      description: updatedDescription,
      children
    };
  }
}
