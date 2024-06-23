import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { and, eq } from "drizzle-orm";

import { SignInCoreSessionsArgs } from "./dto/sign_in.args";
import { DeviceSignInCoreSessionsService } from "./device.service";

import { Ctx } from "../../../utils";
import { DatabaseService } from "../../../database";
import { AccessDeniedError, CustomError } from "../../../errors";
import { core_admin_sessions } from "../../../templates/core/admin/database/schema/admins";
import { core_sessions } from "../../../templates/core/admin/database/schema/sessions";

interface CreateSessionArgs extends Ctx {
  email: string;
  name: string;
  userId: number;
  admin?: boolean;
  remember?: boolean;
}

@Injectable()
export class SignInCoreSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceSignInCoreSessionsService,
  ) {}

  protected async createSession({
    admin,
    email,
    name,
    remember,
    req,
    res,
    userId,
  }: CreateSessionArgs) {
    const loginTokenSecret =
      this.configService.getOrThrow("login_token_secret");

    const device = await this.deviceService.getDevice({ req, res });
    if (!device) {
      throw new AccessDeniedError();
    }

    if (device.uagent_os === "Uagent from tests") {
      throw new CustomError({
        code: "INVALID_DEVICE",
        message:
          "We have detected that you are using an invalid device. Please try again.",
      });
    }

    const login_token = this.jwtService.sign(
      {
        name,
        email,
      },
      {
        secret: loginTokenSecret,
        expiresIn:
          60 *
          60 *
          24 *
          this.configService.getOrThrow("cookies.login_token.expiresIn"),
      },
    );

    const expiresValue: number = this.configService.getOrThrow(
      `cookies.login_token.${remember ? "expiresInRemember" : "expiresIn"}`,
    );

    if (admin) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      const activeSession =
        await this.databaseService.db.query.core_admin_sessions.findFirst({
          where: (table, { eq, and }) =>
            and(eq(table.user_id, userId), eq(table.device_id, device.id)),
        });

      if (activeSession) {
        await this.databaseService.db
          .update(core_admin_sessions)
          .set({
            login_token,
            expires,
          })
          .where(
            and(
              eq(core_admin_sessions.user_id, userId),
              eq(core_admin_sessions.device_id, device.id),
            ),
          );
      } else {
        await this.databaseService.db.insert(core_admin_sessions).values({
          login_token,
          user_id: userId,
          expires,
          device_id: device.id,
        });
      }

      // Set cookie for session
      res.cookie(
        this.configService.getOrThrow("cookies.login_token.admin.name"),
        login_token,
        {
          httpOnly: true,
          secure: true,
          domain: this.configService.getOrThrow("cookies.domain"),
          path: "/",
          expires,
          sameSite: "none",
        },
      );

      return login_token;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + expiresValue);

    // Check if user has an active session in the same device
    const activeSession =
      await this.databaseService.db.query.core_sessions.findFirst({
        where: (table, { eq, and }) =>
          and(eq(table.user_id, userId), eq(table.device_id, device.id)),
      });

    if (activeSession) {
      await this.databaseService.db
        .update(core_sessions)
        .set({
          login_token,
          expires,
        })
        .where(
          and(
            eq(core_sessions.user_id, userId),
            eq(core_sessions.device_id, device.id),
          ),
        );
    } else {
      await this.databaseService.db.insert(core_sessions).values({
        login_token,
        user_id: userId,
        expires,
        device_id: device.id,
      });
    }

    // Set cookie for session
    res.cookie(
      this.configService.getOrThrow("cookies.login_token.name"),
      login_token,
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow("cookies.domain"),
        path: "/",
        expires: remember ? expires : null,
        sameSite: "none",
      },
    );

    return login_token;
  }

  async signIn(
    { admin, email: emailRaw, password, remember }: SignInCoreSessionsArgs,
    ctx: Ctx,
  ) {
    const email = emailRaw.toLowerCase();
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });
    if (!user) throw new AccessDeniedError();

    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new AccessDeniedError();

    // If admin mode is enabled, check if user has access to admin cp
    if (admin) {
      const accessToAdminCP =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { eq, or }) =>
            or(eq(table.group_id, user.group_id), eq(table.user_id, user.id)),
        });
      if (!accessToAdminCP) throw new AccessDeniedError();
    }

    return this.createSession({
      name: user.name,
      email: user.email,
      userId: user.id,
      admin,
      ...ctx,
      remember,
    });
  }
}
