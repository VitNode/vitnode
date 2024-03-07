import { join } from "path";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";

import { DownloadAdminPluginsArgs } from "./dto/download.args";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class DownloadAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async download(
    { code, version, version_code }: DownloadAdminPluginsArgs,
    { id: userId }: User
  ): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    const path = join(process.cwd(), "modules", code);
    const name = `${code}${
      version && version_code ? version : plugin.version
    }--${userId}-${generateRandomString(5)}-${currentDate()}`;

    // Create tgz
    try {
      tar.c({ gzip: true, file: join("temp", `${name}.tgz`), cwd: path }, [
        "."
      ]);
    } catch (error) {
      throw new CustomError({
        code: "CREATE_TGZ_ERROR",
        message: "Error creating tgz file"
      });
    }

    return `${name}.tgz`;
  }
}
