import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { changeDatabaseService, changeModuleRootSchema } from "./contents";

interface ChangeFilesContentType {
  condition: (content: string) => boolean;
  content: (content: string) => string;
  path: string;
}

@Injectable()
export class ChangeFilesCreateAdminPluginsService {
  protected path = "modules";

  protected changeContent({
    files
  }: {
    files: ChangeFilesContentType[];
  }): void {
    files.forEach(file => {
      const path = join(this.path, file.path);
      const content = fs.readFileSync(path, "utf8");

      // Write files
      if (file.condition(content)) {
        fs.writeFileSync(path, file.content(content));
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
        condition: content => content.includes(`./${code}/${code}.module`)
      },
      {
        path: join("database", "database.service.ts"),
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
