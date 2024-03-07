import { join } from "path";
import * as fs from "fs";

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
  protected tempPath = join(process.cwd(), "temp", "plugins");

  protected createFolders(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      });
    }
  }

  protected async prepareTgz({ code }: { code: string }): Promise<void> {
    // Create temp folder
    const tempPath = join(this.tempPath, code);
    this.createFolders(tempPath);

    // Create folders for backend and frontend
    const backendPath = join(tempPath, "backend");
    this.createFolders(backendPath);
    const frontendPath = join(tempPath, "frontend");
    this.createFolders(frontendPath);

    // Copy backend files
    const backendSource = join(process.cwd(), "modules", code);
    fs.cpSync(backendSource, backendPath, { recursive: true });
  }

  protected async createTgz({
    code,
    name
  }: {
    code: string;
    name: string;
  }): Promise<void> {
    this.prepareTgz({ code });

    const path = join(this.tempPath, code);
    try {
      tar
        .c({ gzip: true, file: join("temp", `${name}.tgz`), cwd: path }, ["."])
        .then(() => {
          // Remove temp folder
          fs.rmSync(path, { recursive: true });
        });
    } catch (error) {
      throw new CustomError({
        code: "CREATE_TGZ_ERROR",
        message: "Error creating tgz file"
      });
    }
  }

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

    // Tgs
    const name = `${code}${
      version && version_code ? version_code : plugin.version
    }--${userId}-${generateRandomString(5)}-${currentDate()}`;
    await this.createTgz({ code, name });

    return `${name}.tgz`;
  }
}
