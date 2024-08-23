import { join } from 'path';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import * as tar from 'tar';
import { eq } from 'drizzle-orm';

import { ShowAdminPlugins } from '../show/dto/show.obj';
import { UploadAdminPluginsArgs } from './dto/upload.args';
import { ChangeFilesAdminPluginsService } from '../helpers/files/change/change.service';

import { core_plugins } from '@/database/schema/plugins';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import {
  ABSOLUTE_PATHS_BACKEND,
  ConfigPlugin,
  currentUnixDate,
  CustomError,
  FileUpload,
} from '../../../..';
import { generateRandomString } from '@/functions/generate-random-string';

@Injectable()
export class UploadAdminPluginsService {
  protected path: string = join(process.cwd());
  protected tempPath: string = join(
    ABSOLUTE_PATHS_BACKEND.uploads.temp,
    'plugins',
    `upload-${generateRandomString(5)}${currentUnixDate()}`,
  );

  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService,
  ) {}

  protected async removeTempFolder(): Promise<void> {
    // Delete temp folder
    await fs.promises.rm(this.tempPath, { recursive: true });
  }

  protected async getPluginConfig({
    tgz,
  }: {
    tgz: FileUpload;
  }): Promise<ConfigPlugin> {
    // Create folders
    await fs.promises.mkdir(this.tempPath, { recursive: true });

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
    const pluginFile = await fs.promises.readFile(pathInfoJSON, 'utf8');
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
    if (fs.existsSync(newPathBackend)) {
      await fs.promises.rm(newPathBackend, { recursive: true });
    }
    await fs.promises.mkdir(newPathBackend);

    // Copy temp folder to plugin folder
    const backendSource = join(this.tempPath, 'backend');
    await fs.promises.cp(backendSource, newPathBackend, { recursive: true });
    if (!upload_new_version) {
      this.changeFilesService.changeFilesWhenCreate({ code: config.code });
    }
  }

  protected async copyFilesToPluginFolder({
    destination,
    source,
  }: {
    destination: string;
    source: string;
  }): Promise<void> {
    if (!fs.existsSync(source)) return;

    try {
      await fs.promises.cp(source, destination, {
        recursive: true,
      });
    } catch (_e) {
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
    if (!fs.existsSync(source)) return;

    try {
      await fs.promises.copyFile(source, destination);
    } catch (_e) {
      throw new CustomError({
        code: 'COPY_FILE_TO_PLUGIN_FOLDER_ERROR',
        message: `Source: ${source}, Destination: ${destination}`,
      });
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
        }).frontend.language,
        `${lang.code}.json`,
      );

      if (fs.existsSync(checkExist)) {
        return;
      }

      const source = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: config.code,
        }).frontend.language,
        `en.json`,
      );
      const destination = join(
        ABSOLUTE_PATHS_BACKEND.plugin({
          code: config.code,
        }).frontend.language,
        `${lang.code}.json`,
      );

      void this.copyFileToPluginFolder({ source, destination });
    });
  }

  async upload({
    code,
    file,
  }: UploadAdminPluginsArgs): Promise<ShowAdminPlugins> {
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

    if (code) {
      const plugins = await this.databaseService.db
        .update(core_plugins)
        .set({
          updated: new Date(),
          name: config.name,
          description: config.description,
          support_url: config.support_url,
          author: config.author,
          author_url: config.author_url,
          version: config.version,
          version_code: config.version_code,
          allow_default: config.allow_default,
        })
        .where(eq(core_plugins.code, code))
        .returning();

      const plugin = plugins[0];

      return plugin;
    }

    const plugins = await this.databaseService.db
      .insert(core_plugins)
      .values({
        ...config,
      })
      .returning();

    const plugin = plugins[0];

    // Run migration
    // TODO: Fix this
    // await migrate({ pluginCode: config.code });

    return plugin;
  }
}
