import { UAParser } from "ua-parser-js";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { DatabaseService } from "@/database/database.service";
import { convertUnixTime, currentDate } from "@/functions/date";
import { core_sessions_known_devices } from "@/src/apps/admin/core/database/schema/sessions";
import { Ctx } from "@/types/context.type";

interface DeviceType {
  id: number;
  ip_address: string;
  last_seen: number;
  uagent_browser: string;
  uagent_device_model: string;
  uagent_device_type: string;
  uagent_device_vendor: string;
  uagent_os: string;
  uagent_version: string;
  user_agent: string;
}

@Injectable()
export class DeviceSignInCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  protected getUserAgentData(userAgent: string) {
    const user_parser = new UAParser(userAgent).getResult();

    return {
      user_agent: userAgent,
      uagent_browser: user_parser.browser.name ?? "Uagent from tests",
      uagent_version: user_parser.browser.version ?? "Uagent from tests",
      uagent_os: user_parser.os.name
        ? `${user_parser.os.name} ${user_parser.os.version}`
        : "Uagent from tests",
      uagent_device_vendor: user_parser.device.vendor ?? "Uagent from tests",
      uagent_device_model: user_parser.device.model ?? "Uagent from tests",
      uagent_device_type: user_parser.device.type ?? "Uagent from tests"
    };
  }

  protected async createDevice({ req, res }: Ctx): Promise<DeviceType> {
    const dataDevice = await this.databaseService.db
      .insert(core_sessions_known_devices)
      .values({
        ...this.getUserAgentData(req.headers["user-agent"]),
        last_seen: currentDate(),
        ip_address: req.ip
      })
      .returning();

    const device = dataDevice[0];

    // Set cookie
    res.cookie(
      this.configService.getOrThrow("cookies.known_device.name"),
      device.id,
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow("cookies.domain"),
        path: "/",
        expires: new Date(
          convertUnixTime(
            currentDate() +
              this.configService.getOrThrow("cookies.known_device.expiresIn")
          )
        ),
        sameSite: "none"
      }
    );

    return device;
  }

  async getDevice({ req, res }: Ctx): Promise<DeviceType> {
    const know_device_id: number | undefined =
      +req.cookies[this.configService.getOrThrow("cookies.known_device.name")];

    if (!know_device_id) {
      return await this.createDevice({ req, res });
    }

    const device =
      await this.databaseService.db.query.core_sessions_known_devices.findFirst(
        {
          where: (table, { eq }) => eq(table.id, know_device_id)
        }
      );

    if (!device) {
      return await this.createDevice({ req, res });
    }

    return device;
  }
}
