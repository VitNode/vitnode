import { Injectable } from '@nestjs/common';

import { CreateAdminNavArgs } from './dto/create.args';

import { DatabaseService } from '@/database/database.service';
import { core_nav, core_nav_name } from '../../database/schema/nav';
import { ShowCoreNav } from '@/src/core/nav/show/dto/show.obj';

@Injectable()
export class CreateAdminNavService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    description,
    external,
    href,
    name,
    parent_id
  }: CreateAdminNavArgs): Promise<ShowCoreNav> {
    const theMostHighestPosition = await this.databaseService.db.query.core_nav.findFirst({
      where: (table, { eq }) => eq(table.parent_id, parent_id || null),
      orderBy: (table, { asc }) => asc(table.position)
    });

    const nav = await this.databaseService.db
      .insert(core_nav)
      .values({
        href,
        external,
        parent_id,
        position: theMostHighestPosition ? theMostHighestPosition.position + 1 : 0
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

    const descriptionNav = await this.databaseService.db
      .insert(core_nav_name)
      .values(
        description.map(n => ({
          nav_id: id,
          language_code: n.language_code,
          value: n.value
        }))
      )
      .returning();

    return {
      ...nav[0],
      name: namesNav,
      description: descriptionNav,
      children: []
    };
  }
}
