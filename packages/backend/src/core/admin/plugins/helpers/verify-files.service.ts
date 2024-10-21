import { ABSOLUTE_PATHS_BACKEND, CustomError } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class VerifyFilesAdminPluginsService {
  verifyFiles({
    code,
    errorHandler,
  }: {
    code: string;
    errorHandler?: (path: string) => void;
  }) {
    const pathsToFolders = [
      // Frontend - pages
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.pages,
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.pages_main,
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.pages_main_layout,
      // Frontend - admin pages
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.admin_pages,
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.admin_pages_auth,
      // Frontend - plugin
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.plugin,
    ];

    // Check if the folders exist
    pathsToFolders.forEach(path => {
      if (existsSync(path)) {
        errorHandler?.(path);
        throw new CustomError({
          code: 'CONFLICT_PLUGIN',
          message: `Folder ${path} already exists!`,
        });
      }
    });
  }
}
