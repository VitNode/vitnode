import { Injectable } from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { User, DatabaseService } from "vitnode-backend";

import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

import {
  core_sessions,
  core_sessions_known_devices
} from "@/plugins/core/admin/database/schema/sessions";

@Injectable()
export class ShowCoreSessionDevicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show(user: User): Promise<ShowCoreSessionDevicesObj[]> {
    const edges = await this.databaseService.db
      .select()
      .from(core_sessions)
      .rightJoin(
        core_sessions_known_devices,
        eq(core_sessions.device_id, core_sessions_known_devices.id)
      )
      .where(eq(core_sessions.user_id, user.id))
      .orderBy(desc(core_sessions_known_devices.last_seen));

    return edges.map(item => ({
      ...item.core_sessions_known_devices,
      ...item.core_sessions
    }));
  }
}
