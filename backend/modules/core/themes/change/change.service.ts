import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ChangeCoreThemesArgs } from "./dto/change.args";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { Ctx } from "@/types/context.type";
import { convertUnixTime, currentDate } from "@/functions/date";

@Injectable()
export class ChangeCoreThemesService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  async change({ id }: ChangeCoreThemesArgs, { res }: Ctx): Promise<string> {
    const theme = await this.databaseService.db.query.core_themes.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!theme) {
      throw new NotFoundError("Theme");
    }

    // Set cookie for session
    res.cookie(this.configService.getOrThrow("cookies.theme_id.name"), id, {
      httpOnly: true,
      secure: true,
      domain: this.configService.getOrThrow("cookies.domain"),
      path: "/",
      expires: new Date(
        convertUnixTime(
          currentDate() +
            this.configService.getOrThrow("cookies.theme_id.expiresIn")
        )
      ),
      sameSite: "none"
    });

    return "Success!";
  }
}
