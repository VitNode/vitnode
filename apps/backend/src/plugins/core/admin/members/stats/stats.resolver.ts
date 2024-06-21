import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { StatsAdminMembersService } from "./stats.service";
import { SignUpStatsAdminMembers } from "./dto/stats.obj";

@Resolver()
export class StatsAdminMembersResolver {
  constructor(private readonly service: StatsAdminMembersService) {}

  @Query(() => [SignUpStatsAdminMembers])
  @UseGuards(AdminAuthGuards)
  async admin__core_members__stats_sign_up(): Promise<
    SignUpStatsAdminMembers[]
  > {
    return this.service.signupStats();
  }
}
