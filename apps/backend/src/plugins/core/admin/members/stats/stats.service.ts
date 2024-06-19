import { Injectable } from "@nestjs/common";
import { sql } from "drizzle-orm";

import { SignUpStatsAdminMembers } from "./dto/stats.obj";

import { DatabaseService } from "@/database/database.service";

@Injectable()
export class StatsAdminMembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signupStats(): Promise<SignUpStatsAdminMembers[]> {
    const data = await this.databaseService.db.execute(sql`
    SELECT DATE(core_users.joined) AS joined_date, COUNT(*) AS users_joined
    FROM core_users
    WHERE core_users.joined >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY joined_date
    ORDER BY joined_date ASC;
    `);

    return data.rows.map(row => ({
      joined_date: row.joined_date as string,
      users_joined: row.users_joined as number
    }));
  }
}
