import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import {
  createConfigForDrizzle,
  createFunctionsDatabase,
  createInfoJSON,
  createModuleAdminSchema,
  createModuleSchema
} from "./contents";

import {
  ABSOLUTE_PATHS_BACKEND,
  CustomError,
  PluginInfoJSONType
} from "../../../../../..";

@Injectable()
export class CreateFilesAdminPluginsService {
  createFiles({ code, ...rest }: PluginInfoJSONType): void {
    const folders: {
      files: { content: string; name: string }[];
      path: string;
    }[] = [
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).root,
        files: [
          {
            name: `${code}.module.ts`,
            content: createModuleSchema({ code })
          },
          {
            name: "config.json",
            content: createInfoJSON({ code, allow_default: true, ...rest })
          },
          {
            name: "versions.json",
            content: "{}\n"
          }
        ]
      },
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).admin,
        files: [
          {
            name: "admin.module.ts",
            content: createModuleAdminSchema({ code })
          }
        ]
      },
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).database.init,
        files: [
          {
            name: "index.ts",
            content: `export default {};\n`
          },
          {
            name: "functions.ts",
            content: createFunctionsDatabase()
          },
          {
            name: "drizzle.config.ts",
            content: createConfigForDrizzle({ code })
          }
        ]
      }
    ];

    // Check if folder exists
    folders.forEach(folder => {
      if (fs.existsSync(folder.path)) {
        throw new CustomError({
          code: "PLUGIN_ALREADY_EXISTS",
          message: `Plugin already exists in filesystem with "${code}" code!`
        });
      }
    });

    folders.forEach(folder => {
      // Create folders
      fs.mkdirSync(folder.path, { recursive: true });

      // Create files
      folder.files.forEach(file => {
        fs.writeFile(join(folder.path, file.name), file.content, err => {
          if (err) {
            throw new CustomError({
              code: "ERROR_CREATING_FILE",
              message: err.message
            });
          }
        });
      });
    });
  }
}
