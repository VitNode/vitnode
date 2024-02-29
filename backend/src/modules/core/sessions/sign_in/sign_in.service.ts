import { Injectable } from "@nestjs/common";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { SignInCoreSessionsArgs } from "./dto/sign_in.args";
import { DeviceSignInCoreSessionsService } from "./device.service";

import { AccessDeniedError } from "@/src/utils/errors/AccessDeniedError";
import { Ctx } from "@/src/types/context.type";
import { convertUnixTime, currentDate } from "@/src/functions/date";
import { DatabaseService } from "@/src/database/database.service";
import { core_admin_sessions } from "@/src/modules/admin/core/database/schema/admins";
import { core_sessions } from "@/src/modules/admin/core/database/schema/sessions";
import { CustomError } from "@/src/utils/errors/CustomError";

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
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private deviceService: DeviceSignInCoreSessionsService
  ) {}

  protected async createSession({
    admin,
    email,
    name,
    remember,
    req,
    res,
    userId
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
          "We have detected that you are using an invalid device. Please try again."
      });
    }

    const login_token = this.jwtService.sign(
      {
        name,
        email
      },
      {
        secret: loginTokenSecret,
        expiresIn: this.configService.getOrThrow(
          "cookies.login_token.expiresIn"
        )
      }
    );

    const expires = this.configService.getOrThrow(
      `cookies.login_token.${remember ? "expiresInRemember" : "expiresIn"}`
    );

    if (admin) {
      await this.databaseService.db.insert(core_admin_sessions).values({
        login_token,
        user_id: userId,
        last_seen: currentDate(),
        expires:
          currentDate() +
          this.configService.getOrThrow("cookies.login_token.admin.expiresIn")
      });

      // Set cookie for session
      res.cookie(
        this.configService.getOrThrow("cookies.login_token.admin.name"),
        login_token,
        {
          httpOnly: true,
          secure: true,
          domain: this.configService.getOrThrow("cookies.domain"),
          path: "/",
          expires: new Date(
            convertUnixTime(
              currentDate() +
                this.configService.getOrThrow(
                  "cookies.login_token.admin.expiresIn"
                )
            )
          ),
          sameSite: "none"
        }
      );

      return login_token;
    }

    await this.databaseService.db.insert(core_sessions).values({
      login_token,
      user_id: userId,
      last_seen: currentDate(),
      expires: currentDate() + expires
    });

    // Set cookie for session
    res.cookie(
      this.configService.getOrThrow("cookies.login_token.name"),
      login_token,
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow("cookies.domain"),
        path: "/",
        expires: remember
          ? new Date(
              convertUnixTime(
                currentDate() +
                  this.configService.getOrThrow(
                    "cookies.login_token.expiresInRemember"
                  )
              )
            )
          : null,
        sameSite: "none"
      }
    );

    return login_token;
  }

  async signIn(
    { admin, email: emailRaw, password, remember }: SignInCoreSessionsArgs,
    ctx: Ctx
  ) {
    const email = emailRaw.toLowerCase();
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.email, email)
    });
    if (!user) throw new AccessDeniedError();

    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new AccessDeniedError();

    // If admin mode is enabled, check if user has access to admin cp
    if (admin) {
      const accessToAdminCP =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { eq, or }) =>
            or(eq(table.group_id, user.group_id), eq(table.user_id, user.id))
        });
      if (!accessToAdminCP) throw new AccessDeniedError();
    }

    return await this.createSession({
      name: user.name,
      email: user.email,
      userId: user.id,
      admin,
      ...ctx,
      remember
    });
  }
}
