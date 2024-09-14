import { CustomError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  ConfigType,
  getConfigFile,
} from '@/index';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import {
  removeDatabaseFromService,
  removeLangFromTypes,
  removeModuleFromRootSchema,
} from '../../../delete/contents';
import {
  changeDatabaseService,
  changeLangTypes,
  changeModuleRootSchema,
} from './contents';

interface ChangeFilesContentType {
  condition: (content: string) => boolean;
  content: (content: string) => string;
  path: string;
}

@Injectable()
export class ChangeFilesAdminPluginsService {
  protected changeContent({
    files,
  }: {
    files: ChangeFilesContentType[];
  }): void {
    files.forEach(file => {
      if (!fs.existsSync(file.path)) {
        throw new CustomError({
          code: 'CANNOT_FIND_PLUGIN_PATH',
          message: `Cannot find plugin path with "${file.path}"!`,
        });
      }

      const content = fs.readFileSync(file.path, 'utf8');

      // Write files
      if (file.condition(content)) {
        fs.writeFile(file.path, file.content(content), err => {
          if (err) {
            throw new CustomError({
              code: 'CANNOT_WRITE_FILE',
              message: `Cannot write file with "${file.path}" path!`,
            });
          }
        });
      }
    });
  }

  changeFilesWhenCreate({ code }: { code: string }): void {
    const files: ChangeFilesContentType[] = [
      {
        path: join(ABSOLUTE_PATHS_BACKEND.plugins, 'plugins.module.ts'),
        content: content =>
          changeModuleRootSchema({
            content,
            code,
          }),
        condition: content => !content.includes(`./${code}/${code}.module`),
      },
      {
        path: join(ABSOLUTE_PATHS_BACKEND.backend, 'database', 'config.ts'),
        content: content =>
          changeDatabaseService({
            content,
            code,
          }),
        condition: () => true,
      },
      {
        path: join(ABSOLUTE_PATHS_BACKEND.frontend.init, 'global.d.ts'),
        content: content =>
          changeLangTypes({
            content,
            code,
          }),
        condition: () => true,
      },
    ];

    this.changeContent({ files });
  }

  changeFilesWhenDelete({ code }: { code: string }): void {
    const files: ChangeFilesContentType[] = [
      {
        path: join(ABSOLUTE_PATHS_BACKEND.plugins, 'plugins.module.ts'),
        content: content =>
          removeModuleFromRootSchema({
            content,
            code,
          }),
        condition: () => true,
      },
      {
        path: join(ABSOLUTE_PATHS_BACKEND.backend, 'database', 'config.ts'),
        content: content =>
          removeDatabaseFromService({
            content,
            code,
          }),
        condition: () => true,
      },
      {
        path: join(ABSOLUTE_PATHS_BACKEND.frontend.init, 'global.d.ts'),
        content: content =>
          removeLangFromTypes({
            content,
            code,
          }),
        condition: () => true,
      },
    ];

    this.changeContent({ files });
  }

  setServerToRestartConfig(): void {
    const config = getConfigFile();

    const updatedConfig: ConfigType = {
      ...config,
      restart_server: true,
    };

    fs.writeFileSync(
      configPath,
      JSON.stringify(updatedConfig, null, 2),
      'utf8',
    );
  }
}
