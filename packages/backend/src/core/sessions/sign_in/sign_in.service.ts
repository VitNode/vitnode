import { EmailProvider, getConfigFile } from '@/providers';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { and, eq } from 'drizzle-orm';

import { core_admin_sessions } from '../../../database/schema/admins';
import { core_sessions } from '../../../database/schema/sessions';
import { AccessDeniedError, CustomError } from '../../../errors';
import { GqlContext } from '../../../utils';
import { SendConfirmEmailCoreSessionsService } from '../confirm_email/send.confirm_email.service';
import { verifyPassword } from '../password';
import { DeviceSignInCoreSessionsService } from './device.service';
import { SignInCoreSessionsArgs } from './sign_in.dto';

interface CreateSessionArgs extends GqlContext {
  admin?: boolean;
  email: string;
  name: string;
  remember?: boolean;
  userId: number;
}

@Injectable()
export class SignInCoreSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceSignInCoreSessionsService,
    private readonly sendConfirmEmailCoreSessionsService: SendConfirmEmailCoreSessionsService,
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
    const loginTokenSecret: string =
      this.configService.getOrThrow('login_token_secret');

    const device = await this.deviceService.getDevice({ req, res });

    // if (device.uagent_os === 'Uagent from tests') {
    //   throw new CustomError({
    //     code: 'INVALID_DEVICE',
    //     message:
    //       'We have detected that you are using an invalid device. Please try again.',
    //   });
    // }

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
          this.configService.getOrThrow('cookies.login_token.expiresIn'),
      },
    );

    const expiresValue: number = this.configService.getOrThrow(
      `cookies.login_token.${remember ? 'expiresInRemember' : 'expiresIn'}`,
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
        this.configService.getOrThrow('cookies.login_token.admin.name'),
        login_token,
        {
          httpOnly: true,
          secure: !!this.configService.getOrThrow('cookies.secure'),
          domain: this.configService.getOrThrow('cookies.domain'),
          path: '/',
          expires,
          sameSite: this.configService.getOrThrow('cookies.secure')
            ? 'none'
            : 'lax',
        },
      );

      res.cookie(
        this.configService.getOrThrow('cookies.login_token.admin.admin_id'),
        userId,
        {
          httpOnly: true,
          secure: !!this.configService.getOrThrow('cookies.secure'),
          domain: this.configService.getOrThrow('cookies.domain'),
          path: '/',
          expires,
          sameSite: this.configService.getOrThrow('cookies.secure')
            ? 'none'
            : 'lax',
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
      this.configService.getOrThrow('cookies.login_token.name'),
      login_token,
      {
        httpOnly: true,
        secure: !!this.configService.getOrThrow('cookies.secure'),
        domain: this.configService.getOrThrow('cookies.domain'),
        path: '/',
        expires: remember ? expires : undefined,
        sameSite: this.configService.getOrThrow('cookies.secure')
          ? 'none'
          : 'lax',
      },
    );
    res.cookie(
      this.configService.getOrThrow('cookies.login_token.user_id'),
      userId,
      {
        httpOnly: true,
        secure: !!this.configService.getOrThrow('cookies.secure'),
        domain: this.configService.getOrThrow('cookies.domain'),
        path: '/',
        expires: remember ? expires : undefined,
        sameSite: this.configService.getOrThrow('cookies.secure')
          ? 'none'
          : 'lax',
      },
    );

    return login_token;
  }

  async signIn(
    { admin, email: emailRaw, password, remember }: SignInCoreSessionsArgs,
    context: GqlContext,
  ) {
    const { settings } = getConfigFile();
    const email = emailRaw.toLowerCase();
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
      with: {
        confirm_email: true,
      },
    });
    if (!user) throw new AccessDeniedError();

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) throw new AccessDeniedError();

    if (
      !user.email_verified &&
      settings.authorization.require_confirm_email &&
      settings.email.provider !== EmailProvider.none
    ) {
      await this.sendConfirmEmailCoreSessionsService.sendConfirmEmail({
        userId: user.id,
      });

      throw new CustomError({
        code: 'EMAIL_NOT_VERIFIED',
        message: 'Email not verified',
      });
    }

    // If admin mode is enabled, check if user has access to admin cp
    if (admin) {
      const accessToAdminCP =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { eq, or }) =>
            or(
              user.group_id ? eq(table.group_id, user.group_id) : undefined,
              eq(table.user_id, user.id),
            ),
        });
      if (!accessToAdminCP) throw new AccessDeniedError();
    }

    return this.createSession({
      name: user.name,
      email: user.email,
      userId: user.id,
      admin,
      ...context,
      remember,
    });
  }
}
