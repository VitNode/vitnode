import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import {
  AuthorizationAdminSessionsObj,
  NavAdminPluginsAuthorization
} from "./dto/authorization.obj";

import { currentDate } from "@/functions/date";
import { AuthorizationCurrentUserObj } from "@/plugins/core/sessions/authorization/dto/authorization.obj";
import { DatabaseService } from "@/database/database.service";
import { AccessDeniedError } from "@/utils/errors/access-denied-error";
import { Ctx } from "@/utils/types/context.type";
import { getCoreInfo } from "../../settings/functions/get-core-info";
import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins/plugins.module";

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  protected async getAdminNav(): Promise<NavAdminPluginsAuthorization[]> {
    const adminNav = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (table, { asc }) => asc(table.created),
      columns: {
        code: true
      }
    });

    return adminNav
      .map(({ code }) => {
        const pathConfig = ABSOLUTE_PATHS.plugin({ code }).config;
        if (!fs.existsSync(pathConfig)) {
          return {
            code,
            nav: []
          };
        }

        const config: ConfigPlugin = JSON.parse(
          fs.readFileSync(pathConfig, "utf8")
        );

        return {
          code,
          nav: config.nav
        };
      })
      .filter(plugin => plugin.nav.length > 0);
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
    const coreInfo = await getCoreInfo();

    return {
      user,
      version: coreInfo.version,
      nav: await this.getAdminNav()
    };
  }
}
