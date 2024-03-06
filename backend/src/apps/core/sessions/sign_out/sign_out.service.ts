import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { ConfigService } from "@nestjs/config";

import { Ctx } from "@/types/context.type";
import { DatabaseService } from "@/database/database.service";
import { core_sessions } from "@/src/apps/admin/core/database/schema/sessions";

@Injectable()
export class SignOutCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  async signOut({ req, res }: Ctx) {
    const login_token =
      req.cookies[this.configService.getOrThrow("cookies.login_token.name")];

    if (!login_token) {
      return "You are not logged in";
    }

    await this.databaseService.db
      .delete(core_sessions)
      .where(eq(core_sessions.login_token, login_token));

    res.clearCookie(this.configService.getOrThrow("cookies.login_token.name"), {
      httpOnly: true,
      secure: true,
      domain: this.configService.getOrThrow("cookies.domain"),
      path: "/",
      sameSite: "none"
    });

    return "You are logged out";
  }
}
