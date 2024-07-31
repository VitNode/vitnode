import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

import { AuthorizationAdminSessionsObj } from './dto/authorization.obj';

import { DatabaseService } from '@/utils/database/database.service';
import { DeviceSignInCoreSessionsService } from '../../../sessions/sign_in/device.service';
import { AccessDeniedError, GqlContext } from '@/index';
import { AuthorizationCurrentUserObj } from '../../../sessions/authorization/dto/authorization.obj';
import { core_sessions_known_devices } from '@/database/schema/sessions';
import { currentUnixDate, getUserAgentData, getUserIp } from '@/functions';

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceSignInCoreSessionsService,
  ) {}

  async initialAuthorization({
    req,
    res,
  }: GqlContext): Promise<AuthorizationCurrentUserObj> {
    const login_token =
      req.cookies[
        this.configService.getOrThrow('cookies.login_token.admin.name')
      ];

    if (!login_token) {
      throw new AccessDeniedError();
    }

    const device = await this.deviceService.getDevice({
      req,
      res,
    });

    // If access token exists, check it
    const session =
      await this.databaseService.db.query.core_admin_sessions.findFirst({
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
        },
      });

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken['exp'] < currentUnixDate()) {
      throw new AccessDeniedError();
    }

    // Update last seen
    await this.databaseService.db
      .update(core_sessions_known_devices)
      .set({
        last_seen: new Date(),
        ...getUserAgentData(req.headers['user-agent']),
        ip_address: getUserIp(req),
      })
      .where(eq(core_sessions_known_devices.id, device.id));

    return {
      ...session.user,
      is_admin: true,
      is_mod: true,
    };
  }

  async authorization(
    context: GqlContext,
  ): Promise<AuthorizationAdminSessionsObj> {
    const user = await this.initialAuthorization(context);

    const packageJSONPath = join(__dirname, '../../../../../../package.json');
    if (!fs.existsSync(packageJSONPath)) {
      throw new Error(`package.json not found in ${packageJSONPath}`);
    }
    const packageJSON: { version: string } = JSON.parse(
      fs.readFileSync(packageJSONPath, 'utf8'),
    );

    return {
      user,
      version: packageJSON.version,
    };
  }
}
