import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { SignUpStatsAdminMembers } from './dto/stats.obj';
import { StatsAdminMembersService } from './stats.service';

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
