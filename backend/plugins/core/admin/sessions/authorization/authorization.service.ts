import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import {
  AuthorizationAdminSessionsObj,
  NavAdminPluginsAuthorization
} from "./dto/authorization.obj";

import { Ctx } from "@/types/context.type";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { currentDate } from "@/functions/date";
import { DatabaseService } from "@/plugins/database/database.service";
import { getConfigFile, getCoreInfo } from "@/functions/config/get-config-file";
import { AuthorizationCurrentUserObj } from "@/plugins/core/sessions/authorization/dto/authorization.obj";

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  protected async getAdminNav(): Promise<NavAdminPluginsAuthorization[]> {
    const adminNav = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (table, { asc }) => asc(table.created),
      columns: {
        code: true
      },
      with: {
        nav: {
          orderBy: (table, { asc }) => asc(table.position)
        }
      }
    });

    return adminNav.filter((plugin) => plugin.nav.length > 0);
  }

  async initialAuthorization({
    req
  }: Ctx): Promise<AuthorizationCurrentUserObj> {
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

    return {
      ...session.user,
      is_admin: true,
      is_mod: true
    };
  }

  async authorization(ctx: Ctx): Promise<AuthorizationAdminSessionsObj> {
    const user = await this.initialAuthorization(ctx);

    const config = await getConfigFile();
    const coreInfo = await getCoreInfo();

    return {
      user,
      rebuild_required: config.rebuild_required,
      version: coreInfo.version,
      nav: await this.getAdminNav()
    };
  }
}
