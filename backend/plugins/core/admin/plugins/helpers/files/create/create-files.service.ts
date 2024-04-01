import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import {
  PluginInfoJSONType,
  createFunctionsDatabase,
  createInfoJSON,
  createModuleAdminSchema,
  createModuleSchema
} from "./contents";

import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class CreateFilesAdminPluginsService {
  protected path = join(process.cwd(), "plugins");

  createFiles({ code, ...rest }: PluginInfoJSONType): void {
    const folders: {
      files: { content: string; name: string }[];
      path: string;
    }[] = [
      {
        path: code,
        files: [
          {
            name: `${code}.module.ts`,
            content: createModuleSchema({ code })
          },
          {
            name: "plugin.json",
            content: createInfoJSON({ code, allow_default: true, ...rest })
          },
          {
            name: "versions.json",
            content: "{}\n"
          }
        ]
      },
      {
        path: join(code, "admin"),
        files: [
          {
            name: "admin.module.ts",
            content: createModuleAdminSchema({ code })
          }
        ]
      },
      {
        path: join(code, "admin", "database"),
        files: [
          {
            name: "index.ts",
            content: `export default {};\n`
          },
          {
            name: "functions.ts",
            content: createFunctionsDatabase()
          }
        ]
      }
    ];

    // Check if folder exists
    folders.forEach((folder) => {
      if (fs.existsSync(join(this.path, folder.path))) {
        throw new CustomError({
          code: "PLUGIN_ALREADY_EXISTS",
          message: `Plugin already exists with "${code}" code!`
        });
      }
    });

    folders.forEach((folder) => {
      const path = join(this.path, folder.path);
      // Create folders
      fs.mkdirSync(path, { recursive: true });

      // Create files
      folder.files.forEach((file) => {
        fs.writeFile(join(path, file.name), file.content, (err) => {
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
