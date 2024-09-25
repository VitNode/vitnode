import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { LogsAdminEmailArgs, LogsAdminEmailObj } from './logs.dto';
import { LogsAdminEmailService } from './logs.service';

@Resolver()
export class LogsAdminEmailResolver {
  constructor(private readonly service: LogsAdminEmailService) {}

  @Query(() => LogsAdminEmailObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_email__logs(
    @Args() args: LogsAdminEmailArgs,
  ): Promise<LogsAdminEmailObj> {
    return await this.service.logs(args);
  }
}
