import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { DatabaseService } from "../../../database";
import { core_sessions_known_devices } from "../../../templates/core/admin/database/schema/sessions";
import { Ctx } from "../../../utils";
import { getUserIp, getUserAgentData } from "../../../functions";

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
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  protected async createDevice({ req, res }: Ctx): Promise<DeviceType> {
    const dataDevice = await this.databaseService.db
      .insert(core_sessions_known_devices)
      .values({
        ...getUserAgentData(req.headers["user-agent"]),
        ip_address: getUserIp(req),
      })
      .returning();

    const device = dataDevice[0];

    // Set cookie
    const expires = new Date();
    const expiresIn: number = this.configService.getOrThrow(
      "cookies.known_device.expiresIn",
    );
    expires.setDate(expires.getDate() + expiresIn);
    res.cookie(
      this.configService.getOrThrow("cookies.known_device.name"),
      device.id,
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow("cookies.domain"),
        path: "/",
        expires,
        sameSite: "none",
      },
    );

    return device;
  }

  async getDevice({ req, res }: Ctx): Promise<DeviceType> {
    const know_device_id: number | undefined =
      +req.cookies[this.configService.getOrThrow("cookies.known_device.name")];

    if (!know_device_id) {
      return this.createDevice({ req, res });
    }

    const device =
      await this.databaseService.db.query.core_sessions_known_devices.findFirst(
        {
          where: (table, { eq }) => eq(table.id, know_device_id),
        },
      );

    if (!device) {
      return this.createDevice({ req, res });
    }

    return device;
  }
}
