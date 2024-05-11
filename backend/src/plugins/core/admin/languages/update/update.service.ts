import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";
import { eq } from "drizzle-orm";

import { UpdateCoreAdminLanguagesArgs } from "./dto/update.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_languages } from "../../database/schema/languages";
import { DatabaseService } from "@/database/database.service";
import { setRebuildRequired } from "@/functions/rebuild-required";

@Injectable()
export class UpdateAdminCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  protected path: string = join("..", "frontend", "langs");

  async update({ code, file }: UpdateCoreAdminLanguagesArgs): Promise<string> {
    const lang = await this.databaseService.db.query.core_languages.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!lang) {
      throw new NotFoundError("Language");
    }

    const tgz = await file;

    // Check if folder exists
    const folder = join(this.path, code);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(
          // TODO: Fix this type
          tar.extract({ C: folder, strip: 1 }) as ReturnType<
            typeof tar.extract
          > &
            NodeJS.WritableStream
        )
        .on("error", function (err) {
          reject(err.message);
        })
        .on("finish", function () {
          resolve("success");
        });
    });

    await this.databaseService.db
      .update(core_languages)
      .set({ updated: new Date() })
      .where(eq(core_languages.code, code));

    await setRebuildRequired({ set: "langs" });

    return "Success!";
  }
}
