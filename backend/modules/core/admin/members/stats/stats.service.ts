import { Injectable } from "@nestjs/common";

import { DatabaseService } from "@/modules/database/database.service";

@Injectable()
export class StatsAdminMembersService {
  constructor(private databaseService: DatabaseService) {}

  async signupStats(): Promise<string> {
    return "stats";
  }
}
