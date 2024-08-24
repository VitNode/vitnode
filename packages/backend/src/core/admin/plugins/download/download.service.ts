import { core_plugins } from '@/database/schema/plugins';
import { User } from '@/decorators';
import { CustomError, NotFoundError } from '@/errors';
import {
  currentUnixDate,
  execShellCommand,
  removeSpecialCharacters,
} from '@/functions';
import { generateRandomString } from '@/functions/generate-random-string';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import { join } from 'path';
import * as tar from 'tar';

import { ABSOLUTE_PATHS_BACKEND, PluginInfoJSONType } from '../../../..';
import { DownloadAdminPluginsArgs } from './dto/download.args';

@Injectable()
export class DownloadAdminPluginsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  protected tempPath = join(ABSOLUTE_PATHS_BACKEND.uploads.temp, 'plugins');

  protected copyFiles({
    destination,
    source,
  }: {
    destination: string;
    source: string;
  }): void {
    if (fs.existsSync(source)) {
      fs.cpSync(source, destination, {
        recursive: true,
      });
    }
  }

  protected createFolders(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }
  }

  protected async generateMigration({ code }: { code: string }): Promise<void> {
    const path = ABSOLUTE_PATHS_BACKEND.plugin({ code }).database.migrations;
    const schemaPath = ABSOLUTE_PATHS_BACKEND.plugin({ code }).database.schema;
    if (!fs.existsSync(schemaPath)) return;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }

    try {
      await execShellCommand(
        'npm run drizzle-kit up && npm run drizzle-kit generate',
      );
    } catch (_) {
      throw new CustomError({
        code: 'GENERATE_MIGRATION_ERROR',
        message: 'Error generating migration',
      });
    }
  }

  protected prepareTgz({ code }: { code: string }): string {
    // Create temp folder
    const tempNameFolder = `${code}-download-${generateRandomString(5)}-${currentUnixDate()}`;
    const tempPath = join(this.tempPath, tempNameFolder);
    this.createFolders(tempPath);

    // Create folders for backend and frontend
    const backendPath = join(tempPath, 'backend');
    this.createFolders(backendPath);
    const frontendPath = join(tempPath, 'frontend');
    this.createFolders(frontendPath);

    // Copy backend files
    const backendSource = join(process.cwd(), 'src', 'plugins', code);
    fs.cpSync(backendSource, backendPath, { recursive: true });

    // Copy frontend files
    const frontendPaths = ['admin_pages', 'pages', 'plugin'];
    frontendPaths.forEach(path => {
      this.copyFiles({
        destination: join(frontendPath, path),
        source: ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend[path],
      });
    });

    return tempPath;
  }

  protected async updateVersion({
    code,
    version,
    version_code,
  }: DownloadAdminPluginsArgs): Promise<void> {
    // Update allow_default in config.json
    const pathInfoJSON = ABSOLUTE_PATHS_BACKEND.plugin({ code }).config;
    const infoJSON: PluginInfoJSONType = JSON.parse(
      fs.readFileSync(pathInfoJSON, 'utf-8'),
    );
    const allow_default = fs.existsSync(
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.default_page,
    );
    infoJSON.allow_default = allow_default;
    infoJSON.version = version ?? infoJSON.version;
    infoJSON.version_code = version_code ?? infoJSON.version_code;

    fs.writeFile(
      pathInfoJSON,
      JSON.stringify(infoJSON, null, 2),
      'utf8',
      err => {
        if (err) {
          throw new CustomError({
            code: 'ERROR_UPDATING_INFO_JSON',
            message: err.message,
          });
        }
      },
    );

    if (!version || !version_code) {
      // Update only allow_default
      await this.databaseService.db
        .update(core_plugins)
        .set({
          allow_default,
          updated: new Date(),
        })
        .where(eq(core_plugins.code, code));

      return;
    }

    await this.databaseService.db
      .update(core_plugins)
      .set({
        version,
        version_code,
        allow_default,
        updated: new Date(),
      })
      .where(eq(core_plugins.code, code))
      .returning();
  }

  async download(
    { code, version, version_code }: DownloadAdminPluginsArgs,
    { id: userId }: User,
  ): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (!plugin) {
      throw new NotFoundError('Plugin');
    }

    await this.generateMigration({ code });
    await this.updateVersion({ code, version, version_code });

    // Tgs
    const name = removeSpecialCharacters(
      `${code}${
        version && version_code ? version_code : plugin.version_code
      }--${userId}-${generateRandomString(5)}-${currentUnixDate()}`,
    );
    const tempPath = this.prepareTgz({ code });

    try {
      void tar
        .c(
          {
            gzip: true,
            file: join(ABSOLUTE_PATHS_BACKEND.uploads.temp, `${name}.tgz`),
            cwd: tempPath,
          },
          ['.'],
        )
        .then(() => {
          // Remove temp folder
          fs.rmSync(tempPath, { recursive: true });
        });
    } catch (_) {
      throw new CustomError({
        code: 'CREATE_TGZ_ERROR',
        message: 'Error creating tgz file',
      });
    }

    return `${name}.tgz`;
  }
}
