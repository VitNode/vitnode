import { generateRandomString } from '@/functions/generate-random-string';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { copyFile, cp, mkdir, readFile, rm } from 'fs/promises';
import { join } from 'path';
import * as tar from 'tar';

import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  currentUnixDate,
  CustomError,
  FileUpload,
} from '../../../..';
import { ChangeFilesAdminPluginsService } from '../helpers/files/change/change.service';
import { UploadAdminPluginsArgs } from './upload.dto';

@Injectable()
export class UploadAdminPluginsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService,
  ) {}
  protected path: string = join(process.cwd());

  protected tempPath: string = join(
    ABSOLUTE_PATHS_BACKEND.uploads.temp,
    'plugins',
    `upload-${generateRandomString(5)}${currentUnixDate()}`,
  );

  protected async copyFilesToPluginFolder({
    destination,
    source,
  }: {
    destination: string;
    source: string;
  }): Promise<void> {
    if (!existsSync(source)) return;

    try {
      await cp(source, destination, {
        recursive: true,
      });
    } catch (_) {
      throw new CustomError({
        code: 'COPY_FILES_TO_PLUGIN_FOLDER_ERROR',
        message: `Source: ${source}, Destination: ${destination}`,
      });
    }
  }

  protected async copyFileToPluginFolder({
    destination,
    source,
  }: {
    destination: string;
    source: string;
  }) {
    if (!existsSync(source)) return;

    try {
      await copyFile(source, destination);
    } catch (_) {
      throw new CustomError({
        code: 'COPY_FILE_TO_PLUGIN_FOLDER_ERROR',
        message: `Source: ${source}, Destination: ${destination}`,
      });
    }
  }

  protected async createPluginBackend({
    config,
    upload_new_version,
  }: {
    config: ConfigPlugin;
    upload_new_version?: boolean;
  }): Promise<void> {
    const newPathBackend = ABSOLUTE_PATHS_BACKEND.plugin({
      code: config.code,
    }).root;
    if (existsSync(newPathBackend)) {
      await rm(newPathBackend, { recursive: true });
    }
    await mkdir(newPathBackend);

    // Copy temp folder to plugin folder
    const backendSource = join(this.tempPath, 'backend');
    await cp(backendSource, newPathBackend, { recursive: true });
    if (!upload_new_version) {
      this.changeFilesService.changeFilesWhenCreate({ code: config.code });
    }
  }

  protected async createPluginFrontend({
    config,
  }: {
    config: ConfigPlugin;
  }): Promise<void> {
    const frontendPaths = ['admin_pages', 'pages', 'plugin'];
    await Promise.all(
      frontendPaths.map(async path => {
        const source = join(this.tempPath, 'frontend', path);
        const destination: string = ABSOLUTE_PATHS_BACKEND.plugin({
          code: config.code,
        }).frontend[path];

        return this.copyFilesToPluginFolder({ source, destination });
      }),
    );

    // Copy language
    const languages =
      await this.databaseService.db.query.core_languages.findMany({
        columns: {
          code: true,
        },
      });

    languages.forEach(lang => {
      const checkExist = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: config.code,
        }).frontend.languages,
        `${lang.code}.json`,
      );

      if (existsSync(checkExist)) {
        return;
      }

      const source = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: config.code,
        }).frontend.languages,
        `en.json`,
      );
      const destination = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: config.code,
        }).frontend.languages,
        `${lang.code}.json`,
      );

      void this.copyFileToPluginFolder({ source, destination });
    });
  }

  protected async getPluginConfig({
    tgz,
  }: {
    tgz: FileUpload;
  }): Promise<ConfigPlugin> {
    // Create folders
    await mkdir(this.tempPath, { recursive: true });

    // Upload to temp folder
    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(
          tar.extract({
            C: this.tempPath,
            strip: 1,
          }),
        )
        .on('error', err => {
          throw new reject(err.message);
        })
        .on('finish', () => {
          resolve('success');
        });
    });

    const pathInfoJSON = join(this.tempPath, 'backend', 'config.json');
    const pluginFile = await readFile(pathInfoJSON, 'utf8');
    const config: ConfigPlugin = JSON.parse(pluginFile);

    // Check if variables exists
    if (
      !config.name ||
      !config.author ||
      !config.code ||
      !config.support_url ||
      !config.version ||
      !config.version_code
    ) {
      await this.removeTempFolder();
      throw new CustomError({
        code: 'PLUGIN_CONFIG_VARIABLES_NOT_FOUND',
        message: 'Plugin config variables not found',
      });
    }

    return config;
  }

  protected async removeTempFolder(): Promise<void> {
    // Delete temp folder
    await rm(this.tempPath, { recursive: true });
  }

  async upload({ code, file }: UploadAdminPluginsArgs): Promise<string> {
    const tgz = await file;
    const config = await this.getPluginConfig({ tgz });

    const checkPlugin =
      await this.databaseService.db.query.core_plugins.findFirst({
        where: (table, { eq }) => eq(table.code, config.code),
      });

    if (checkPlugin && !code) {
      await this.removeTempFolder();
      throw new CustomError({
        code: 'PLUGIN_ALREADY_EXISTS',
        message: 'Plugin already exists',
      });
    }

    if (code && code !== config.code) {
      await this.removeTempFolder();
      throw new CustomError({
        code: 'PLUGIN_CODE_NOT_MATCH',
        message: 'Plugin code not match',
      });
    }

    if (checkPlugin && code && config.version_code < checkPlugin.version_code) {
      await this.removeTempFolder();
      throw new CustomError({
        code: 'PLUGIN_VERSION_IS_LOWER',
        message: 'Plugin version is lower than the current version',
      });
    }

    // Create plugin folder
    await this.createPluginBackend({ config, upload_new_version: !!code });
    await this.createPluginFrontend({ config });
    await this.removeTempFolder();

    return 'Success!';
  }
}
