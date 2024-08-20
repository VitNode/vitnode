import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

import { DeviceSignInCoreSessionsService } from '../../sign_in/device.service';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { User } from '@/decorators';
import { GqlContext } from '@/utils';
import { AccessDeniedError, NotFoundError } from '@/errors';
import { core_users } from '@/database/schema/users';
import { core_sessions_known_devices } from '@/database/schema/sessions';
import { currentUnixDate, getUserAgentData, getUserIp } from '@/functions';

@Injectable()
export class InternalAuthorizationCoreSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceSignInCoreSessionsService,
  ) {}

  async authorization({ request, reply }: GqlContext): Promise<User> {
    const login_token =
      request.cookies[
        this.configService.getOrThrow('cookies.login_token.name')
      ];
    const know_device_id =
      request.cookies[
        this.configService.getOrThrow('cookies.known_device.name')
      ];

    if (!request.headers['user-agent']) {
      throw new NotFoundError('User-Agent');
    }

    if (!login_token || !know_device_id) {
      throw new AccessDeniedError();
    }

    const device = await this.deviceService.getDevice({
      request,
      reply,
    });

    const session = await this.databaseService.db.query.core_sessions.findFirst(
      {
        where: (table, { eq, and, gt }) =>
          and(
            eq(table.login_token, login_token),
            eq(table.device_id, device.id),
            gt(table.expires, new Date()),
          ),
        with: {
          user: {
            with: {
              avatar: true,
              group: {
                with: {
                  name: true,
                },
              },
            },
          },
          device: true,
        },
      },
    );

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken: {
      email: string;
      exp: number;
    } = this.jwtService.decode(login_token);
    if (
      !decodeAccessToken ||
      decodeAccessToken['exp'] < currentUnixDate() ||
      decodeAccessToken.email !== session.user.email
    ) {
      throw new AccessDeniedError();
    }

    const languageToSet: string =
      (Array.isArray(request.headers['x-vitnode-user-language'])
        ? request.headers['x-vitnode-user-language'][0]
        : request.headers['x-vitnode-user-language']) ?? 'en';
    if (
      request.headers['x-vitnode-user-language'] &&
      session.user.language !== request.headers['x-vitnode-user-language'] &&
      languageToSet !== session.user.language
    ) {
      await this.databaseService.db
        .update(core_users)
        .set({
          language: languageToSet,
        })
        .where(eq(core_users.id, session.user.id));
    }

    // Update last seen
    await this.databaseService.db
      .update(core_sessions_known_devices)
      .set({
        last_seen: new Date(),
        ...getUserAgentData(request.headers['user-agent']),
        ip_address: getUserIp(request),
      })
      .where(eq(core_sessions_known_devices.id, device.id));

    // Update known device cookie
    const expires = new Date();
    const expiresInDeviceCookie: number = this.configService.getOrThrow(
      'cookies.known_device.expiresIn',
    );
    expires.setDate(expires.getDate() + expiresInDeviceCookie);
    reply.cookie(
      this.configService.getOrThrow('cookies.known_device.name'),
      know_device_id,
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow('cookies.domain'),
        path: '/',
        expires,
        sameSite: 'none',
      },
    );

    return session.user;
  }
}
