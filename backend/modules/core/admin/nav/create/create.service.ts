import { Injectable } from "@nestjs/common";

import { CreateAdminNavArgs } from "./dto/create.args";

import { DatabaseService } from "@/modules/database/database.service";
import {
  core_nav,
  core_nav_description,
  core_nav_name
} from "../../database/schema/nav";
import { ShowCoreNav } from "@/modules/core/nav/show/dto/show.obj";

@Injectable()
export class CreateAdminNavService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    description,
    external,
    href,
    icon,
    name
  }: CreateAdminNavArgs): Promise<ShowCoreNav> {
    const theMostHighestPosition =
      await this.databaseService.db.query.core_nav.findFirst({
        where: (table, { isNull }) => isNull(table.parent_id),
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

    const namesNav = await this.databaseService.db
      .insert(core_nav_name)
      .values(
        name.map(n => ({
          nav_id: id,
          language_code: n.language_code,
          value: n.value
        }))
      )
      .returning();

    const descriptionNav =
      description.length > 0
        ? await this.databaseService.db
            .insert(core_nav_description)
            .values(
              description.map(n => ({
                nav_id: id,
                language_code: n.language_code,
                value: n.value
              }))
            )
            .returning()
        : [];

    return {
      ...nav[0],
      name: namesNav,
      description: descriptionNav,
      children: []
    };
  }
}
