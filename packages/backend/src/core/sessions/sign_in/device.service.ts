import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { core_sessions_known_devices } from '../../../database/schema/sessions';
import { GqlContext } from '../../../utils';
import { getUserIp, getUserAgentData } from '../../../functions';
import { NotFoundError } from '@/errors';

interface DeviceType {
  id: number;
  ip_address: string;
  last_seen: Date;
  uagent_browser: string;
  uagent_os: string;
  uagent_version: string;
  user_agent: string;
}

@Injectable()
export class DeviceSignInCoreSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly configService: ConfigService,
  ) {}

  protected async createDevice({
    request,
    reply,
  }: GqlContext): Promise<DeviceType> {
    if (!request.headers['user-agent']) {
      throw new NotFoundError('User-Agent');
    }

    const dataDevice = await this.databaseService.db
      .insert(core_sessions_known_devices)
      .values({
        ...getUserAgentData(request.headers['user-agent']),
        ip_address: getUserIp(request),
      })
      .returning();

    const device = dataDevice[0];

    // Set cookie
    const expires = new Date();
    const expiresIn: number = this.configService.getOrThrow(
      'cookies.known_device.expiresIn',
    );
    expires.setDate(expires.getDate() + expiresIn);
    reply.cookie(
      this.configService.getOrThrow('cookies.known_device.name'),
      device.id.toString(),
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow('cookies.domain'),
        path: '/',
        expires,
        sameSite: 'none',
      },
    );

    return device;
  }

  async getDevice({ request, reply }: GqlContext): Promise<DeviceType> {
    const know_device_id =
      request.cookies[
        this.configService.getOrThrow('cookies.known_device.name')
      ];

    if (!know_device_id) {
      return this.createDevice({ request, reply });
    }

    const device =
      await this.databaseService.db.query.core_sessions_known_devices.findFirst(
        {
          where: (table, { eq }) => eq(table.id, +know_device_id),
        },
      );

    if (!device) {
      return this.createDevice({ request, reply });
    }

    return device;
  }
}
