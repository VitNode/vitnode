import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { changeDatabaseService, changeModuleRootSchema } from "./contents";

import {
  removeDatabaseFromService,
  removeModuleFromRootSchema
} from "../../../delete/contents";
import { CustomError } from "@/utils/errors/custom-error";

interface ChangeFilesContentType {
  condition: (content: string) => boolean;
  content: (content: string) => string;
  path: string;
}

@Injectable()
export class ChangeFilesAdminPluginsService {
  protected path = join(process.cwd(), "src", "plugins");

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

  changeFilesWhenCreate({ code }: { code: string }): void {
    const files: ChangeFilesContentType[] = [
      {
        path: "plugins.module.ts",
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
            code
          }),
        condition: () => true
      }
    ];

    this.changeContent({ files });
  }

  changeFilesWhenDelete({ code }: { code: string }): void {
    const files: ChangeFilesContentType[] = [
      {
        path: "plugins.module.ts",
        content: content =>
          removeModuleFromRootSchema({
            content,
            code
          }),
        condition: () => true
      },
      {
        path: join("database", "schema.ts"),
        content: content =>
          removeDatabaseFromService({
            content,
            code
          }),
        condition: () => true
      }
    ];

    this.changeContent({ files });
  }
}
