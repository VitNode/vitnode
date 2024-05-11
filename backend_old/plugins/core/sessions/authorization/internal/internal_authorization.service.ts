import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { eq } from "drizzle-orm";

import { Ctx } from "@/types/context.type";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { currentDate } from "@/functions/date";
import { DatabaseService } from "@/plugins/database/database.service";
import { User } from "@/utils/decorators/user.decorator";
import { core_sessions_known_devices } from "@/plugins/core/admin/database/schema/sessions";
import { DeviceSignInCoreSessionsService } from "../../sign_in/device.service";
import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class InternalAuthorizationCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private deviceService: DeviceSignInCoreSessionsService
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
          },
          device: true
        }
      }
    );

    if (!session) {
      throw new AccessDeniedError();
    }

    if (session.device.id !== device.id) {
      throw new CustomError({
        code: "DEVICE_CHANGED",
        message: "Device has been changed"
      });
    }

    // Update last seen
    await this.databaseService.db
      .update(core_sessions_known_devices)
      .set({
        last_seen: new Date()
      })
      .where(eq(core_sessions_known_devices.id, know_device_id));

    // Update sign in date
    const expires = new Date();
    const expiresIn: number = this.configService.getOrThrow(
      "cookies.known_device.expiresIn"
    );
    expires.setDate(expires.getDate() + expiresIn);
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

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken["exp"] < currentDate()) {
      throw new AccessDeniedError();
    }

    return session.user;
  }
}
