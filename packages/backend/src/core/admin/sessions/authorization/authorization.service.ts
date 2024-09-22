import { core_files } from '@/database/schema/files';
import { core_sessions_known_devices } from '@/database/schema/sessions';
import { currentUnixDate, getUserAgentData, getUserIp } from '@/functions';
import {
  AccessDeniedError,
  getConfigFile,
  GqlContext,
  InternalServerError,
  NotFoundError,
} from '@/index';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { eq, sum } from 'drizzle-orm';
import * as fs from 'fs';
import { join } from 'path';

import { AuthorizationCurrentUserObj } from '../../../sessions/authorization/authorization.dto';
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

  async authorization(
    context: GqlContext,
  ): Promise<AuthorizationAdminSessionsObj> {
    const currentUser = await this.initialAuthorization(context);
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.id, currentUser.id),
      columns: {
        id: true,
      },
      with: {
        group: {
          columns: {
            files_allow_upload: true,
            files_max_storage_for_submit: true,
            files_total_max_storage: true,
          },
        },
      },
    });

    if (!user) {
      throw new InternalServerError();
    }

    const config = getConfigFile();

    const packageJSONPath = join(__dirname, '../../../../../../package.json');
    if (!fs.existsSync(packageJSONPath)) {
      throw new Error(`package.json not found in ${packageJSONPath}`);
    }
    const packageJSON: { version: string } = JSON.parse(
      fs.readFileSync(packageJSONPath, 'utf8'),
    );

    const countStorageUsedDb = await this.databaseService.db
      .select({
        space_used: sum(core_files.file_size),
      })
      .from(core_files)
      .where(eq(core_files.user_id, currentUser.id));
    const countStorageUsed = +(countStorageUsedDb[0].space_used ?? 0);

    return {
      user: currentUser,
      version: packageJSON.version,
      restart_server: config.restart_server,
      files: {
        allow_upload: user.group.files_allow_upload,
        max_storage_for_submit: user.group.files_max_storage_for_submit
          ? user.group.files_max_storage_for_submit * 1024
          : user.group.files_max_storage_for_submit,
        total_max_storage: user.group.files_total_max_storage
          ? user.group.files_total_max_storage * 1024
          : user.group.files_total_max_storage,
        space_used: countStorageUsed,
      },
    };
  }

  async initialAuthorization({
    req,
    res,
  }: GqlContext): Promise<AuthorizationCurrentUserObj> {
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
      is_admin: true,
      is_mod: true,
    };
  }
}
