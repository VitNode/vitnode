import { cpSync } from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { CreateAdminThemesArgs } from './dto/create.args';

import { DatabaseService } from '@/database/database.service';
import { core_themes } from '../../database/schema/themes';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async create({ author, author_url, name, support_url }: CreateAdminThemesArgs): Promise<string> {
    const theme = await this.databaseService.db
      .insert(core_themes)
      .values({
        name,
        support_url,
        author,
        author_url,
        created: currentDate()
      })
      .returning();

    const { id } = theme[0];

    // Copy the default theme to the new theme
    cpSync(join('..', 'frontend', 'themes', '1'), join('..', 'frontend', 'themes', id.toString()), {
      recursive: true
    });

    return 'create';
  }
}
