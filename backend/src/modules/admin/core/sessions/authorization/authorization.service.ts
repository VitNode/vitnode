import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthorizationAdminSessionsObj } from "./dto/authorization.obj";

import { Ctx } from "@/types/context.type";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { currentDate } from "@/functions/date";
import { DatabaseService } from "@/database/database.service";
import { getConfigFile } from "@/functions/config/get-config-file";

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async authorization({ req }: Ctx): Promise<AuthorizationAdminSessionsObj> {
    const login_token =
      req.cookies[
        this.configService.getOrThrow("cookies.login_token.admin.name")
      ];

    if (!login_token) {
      throw new AccessDeniedError();
    }

    // If access token exists, check it
    const session =
      await this.databaseService.db.query.core_admin_sessions.findFirst({
        where: (table, { eq }) => eq(table.login_token, login_token),
        with: {
          user: {
            with: {
              avatar: true,
              group: {
                with: {
                  name: true
                }
              }
            }
          }
        }
      });

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken["exp"] < currentDate()) {
      throw new AccessDeniedError();
    }

    const config = await getConfigFile();
    const { user } = session;

    return {
      user: {
        ...user,
        is_admin: true,
        is_mod: true
      },
      rebuild_required: config.rebuild_required
    };
  }
}
