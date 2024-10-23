import { core_plugins } from '@/database/schema/plugins';
import { CustomError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

import { ABSOLUTE_PATHS_BACKEND } from '../../../..';
import { ChangeFilesAdminPluginsService } from '../helpers/change-files.service';
import { CreateFilesAdminPluginsService } from '../helpers/files/create/create-files.service';
import { VerifyFilesAdminPluginsService } from '../helpers/verify-files.service';
import { ShowAdminPlugins } from '../show/show.dto';
import { CreateAdminPluginsArgs } from './create.dto';

@Injectable()
export class CreateAdminPluginsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly createFilesService: CreateFilesAdminPluginsService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService,
    private readonly verifyFilesService: VerifyFilesAdminPluginsService,
  ) {}

  private async createLanguageFiles({
    code,
    name,
  }: {
    code: string;
    name: string;
  }) {
    const languages =
      await this.databaseService.db.query.core_languages.findMany({
        orderBy: (table, { asc }) => asc(table.code),
      });

    await Promise.all(
      languages.map(async lang => {
        const langPath = join(
          ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.languages,
        );

        if (!existsSync(langPath)) {
          await mkdir(langPath, { recursive: true });
        }

        await writeFile(
          join(langPath, `${lang.code}.json`),
          JSON.stringify(
            {
              [code]: {},
              [`admin_${code}`]: {
                nav: {
                  title: name,
                },
              },
            },
            null,
            2,
          ),
          'utf-8',
        );
      }),
    );
  }

  async create({
    author,
    author_url,
    code,
    description,
    name,
    support_url,
  }: CreateAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (plugin || code === 'admin' || code === 'core' || code === 'members') {
      throw new CustomError({
        code: 'PLUGIN_ALREADY_EXISTS',
        message: `Plugin already exists with "${code}" code!`,
      });
    }

    // Verify files and folders to check if they exist
    this.verifyFilesService.verifyFiles({ code });

    const [data] = await Promise.all([
      // Insert into database
      this.databaseService.db
        .insert(core_plugins)
        .values({
          code,
          description,
          name,
          support_url,
          author,
          author_url,
        })
        .returning(),

      // Create basic files
      this.createFilesService.createFiles({
        author,
        author_url,
        code,
        description,
        name,
        support_url,
        allow_default: true,
        nav: [],
        version: '0.0.1',
        version_code: 1,
      }),

      // Create i18n files
      this.createLanguageFiles({ code, name }),

      // Modifying / Create files
      this.changeFilesService.changeFiles({ code, action: 'add' }),
      this.changeFilesService.setServerToRestartConfig(),
    ]);

    return data[0];
  }
}
