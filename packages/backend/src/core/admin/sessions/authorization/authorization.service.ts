import { core_sessions_known_devices } from '@/database/schema/sessions';
import { currentUnixDate, getUserAgentData, getUserIp } from '@/functions';
import {
  AccessDeniedError,
  getConfigFile,
  GqlContext,
  NotFoundError,
  User,
} from '@/index';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import { join } from 'path';

import { DeviceSignInCoreSessionsService } from '../../../sessions/sign_in/device.service';
import { AuthorizationAdminSessionsObj } from './authorization.dto';

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceSignInCoreSessionsService,
  ) {}

  private getPackageJSON() {
    const packageJSONPath = join(__dirname, '../../../../../../package.json');
    if (!fs.existsSync(packageJSONPath)) {
      throw new Error(`package.json not found in ${packageJSONPath}`);
    }
    const packageJSON: { version: string } = JSON.parse(
      fs.readFileSync(packageJSONPath, 'utf8'),
    );

    return packageJSON;
  }

  private async getPermissions({
    user,
  }: {
    user: User;
  }): Promise<AuthorizationAdminSessionsObj['permissions']> {
    const admin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { or, eq }) =>
          or(eq(table.user_id, user.id), eq(table.group_id, user.group.id)),
      });

    if (!admin) {
      throw new AccessDeniedError();
    }

    return admin.permissions as AuthorizationAdminSessionsObj['permissions'];
  }

  async authorization(
    context: GqlContext,
  ): Promise<AuthorizationAdminSessionsObj> {
    const user = await this.initialAuthorization(context);
    const permissions = await this.getPermissions({ user });
    const config = getConfigFile();

    return {
      user,
      version: this.getPackageJSON().version,
      restart_server: config.restart_server,
      permissions,
    };
  }

  async initialAuthorization({ req, res }: GqlContext) {
    if (!req.headers['user-agent']) {
      throw new NotFoundError('User-Agent');
    }

    const login_token: string =
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
            columns: {
              email: true,
              newsletter: true,
            },
          },
        },
      });

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken.exp < currentUnixDate()) {
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

    const user = await getUser({
      id: session.user_id,
      db: this.databaseService.db,
    });

    return {
      ...user,
      ...session.user,
    };
  }
}
