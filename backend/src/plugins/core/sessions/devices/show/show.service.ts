import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

import { User } from "@/utils/decorators/user.decorator";
import { core_sessions } from "@/plugins/core/admin/database/schema/sessions";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class ShowCoreSessionDevicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show(user: User): Promise<ShowCoreSessionDevicesObj[]> {
    const edges = await this.databaseService.db.query.core_sessions.findMany({
      where: eq(core_sessions.user_id, user.id),
      with: {
        device: true
      }
    });

    return edges
      .sort(
        (a, b) => b.device.last_seen.getTime() - a.device.last_seen.getTime()
      )
      .map(item => ({
        ...item.device,
        expires: item.expires,
        login_token: item.login_token
      }));
  }
}
