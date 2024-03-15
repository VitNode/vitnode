import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { StatsAdminMembersService } from "./stats.service";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class StatsAdminMembersResolver {
  constructor(private readonly service: StatsAdminMembersService) {}

  @Query(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__stats_sign_up(): Promise<string> {
    return await this.service.signupStats();
  }
}
