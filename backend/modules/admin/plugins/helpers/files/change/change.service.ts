import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { changeDatabaseService, changeModuleRootSchema } from "./contents";

import { CustomError } from "@/utils/errors/CustomError";

interface ChangeFilesContentType {
  condition: (content: string) => boolean;
  content: (content: string) => string;
  path: string;
}

@Injectable()
export class ChangeFilesAdminPluginsService {
  protected path = join(process.cwd(), "modules");

  protected changeContent({
    files
  }: {
    files: ChangeFilesContentType[];
  }): void {
    files.forEach(file => {
      const path = join(this.path, file.path);

      if (!fs.existsSync(path)) {
        throw new CustomError({
          code: "CANNOT_FIND_PLUGIN_PATH",
          message: `Cannot find plugin path with "${path}"!`
        });
      }

      const content = fs.readFileSync(path, "utf8");

      // Write files
      if (file.condition(content)) {
        fs.writeFile(path, file.content(content), err => {
          if (err) {
            throw new CustomError({
              code: "CANNOT_WRITE_FILE",
              message: `Cannot write file with "${path}" path!`
            });
          }
        });
      }
    });
  }

  changeFiles({ code }: { code: string }): void {
    const files: ChangeFilesContentType[] = [
      {
        path: "modules.module.ts",
        content: content =>
          changeModuleRootSchema({
            content,
            code
          }),
        condition: content => !content.includes(`./${code}/${code}.module`)
      },
      {
        path: join("database", "schema.ts"),
        content: content =>
          changeDatabaseService({
            content,
            code,
            admin: true
          }),
        condition: () => true
      }
    ];

    this.changeContent({ files });
  }
}
