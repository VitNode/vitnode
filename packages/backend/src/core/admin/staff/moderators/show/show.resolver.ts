import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminStaffModeratorsArgs } from './dto/show.args';
import { ShowAdminStaffModeratorsObj } from './dto/show.obj';
import { ShowAdminStaffModeratorsService } from './show.service';

@Resolver()
export class ShowAdminStaffModeratorsResolver {
  constructor(private readonly service: ShowAdminStaffModeratorsService) {}

  @Query(() => ShowAdminStaffModeratorsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_moderators__show(
    @Args() args: ShowAdminStaffModeratorsArgs,
  ): Promise<ShowAdminStaffModeratorsObj> {
    return this.service.show(args);
  }
}
