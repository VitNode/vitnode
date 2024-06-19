import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { eq } from "drizzle-orm";
import { currentUnixDate } from "@vitnode/shared";
import {
  AccessDeniedError,
  getUserAgentData,
  getUserIp,
  User,
  Ctx
} from "vitnode-backend";

import { core_sessions_known_devices } from "@/plugins/core/admin/database/schema/sessions";
import { DeviceSignInCoreSessionsService } from "../../sign_in/device.service";
import { DatabaseService } from "@/database/database.service";
import { core_users } from "@/plugins/core/admin/database/schema/users";

@Injectable()
export class InternalAuthorizationCoreSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceSignInCoreSessionsService
  ) {}

  async authorization({ req, res }: Ctx): Promise<User> {
    const login_token =
      req.cookies[this.configService.getOrThrow("cookies.login_token.name")];
    const know_device_id: number | undefined =
      +req.cookies[this.configService.getOrThrow("cookies.known_device.name")];

    if (!login_token || !know_device_id) {
      throw new AccessDeniedError();
    }

    const device = await this.deviceService.getDevice({
      req,
      res
    });

    const session = await this.databaseService.db.query.core_sessions.findFirst(
      {
        where: (table, { eq, and, gt }) =>
          and(
            eq(table.login_token, login_token),
            eq(table.device_id, device.id),
            gt(table.expires, new Date())
          ),
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
          },
          device: true
        }
      }
    );

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken["exp"] < currentUnixDate()) {
      throw new AccessDeniedError();
    }

    if (session.user.language !== req.headers["x-vitnode-user-language"]) {
      await this.databaseService.db
        .update(core_users)
        .set({
          language: Array.isArray(req.headers["x-vitnode-user-language"])
            ? req.headers["x-vitnode-user-language"][0]
            : req.headers["x-vitnode-user-language"]
        })
        .where(eq(core_users.id, session.user.id));
    }

    // Update last seen
    await this.databaseService.db
      .update(core_sessions_known_devices)
      .set({
        last_seen: new Date(),
        ...getUserAgentData(req.headers["user-agent"]),
        ip_address: getUserIp(req)
      })
      .where(eq(core_sessions_known_devices.id, device.id));

    // Update known device cookie
    const expires = new Date();
    const expiresInDeviceCookie: number = this.configService.getOrThrow(
      "cookies.known_device.expiresIn"
    );
    expires.setDate(expires.getDate() + expiresInDeviceCookie);
    res.cookie(
      this.configService.getOrThrow("cookies.known_device.name"),
      know_device_id,
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow("cookies.domain"),
        path: "/",
        expires,
        sameSite: "none"
      }
    );

    return session.user;
  }
}
