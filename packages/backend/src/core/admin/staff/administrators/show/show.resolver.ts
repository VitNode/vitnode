import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminStaffAdministratorsService } from './show.service';
import { ShowAdminStaffAdministratorsObj } from './dto/show.obj';
import { ShowAdminStaffAdministratorsArgs } from './dto/show.args';

import { AdminAuthGuards } from '@/utils';

@Resolver()
export class ShowAdminStaffAdministratorResolver {
  constructor(private readonly service: ShowAdminStaffAdministratorsService) {}

  @Query(() => ShowAdminStaffAdministratorsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_administrators__show(
    @Args() args: ShowAdminStaffAdministratorsArgs,
  ): Promise<ShowAdminStaffAdministratorsObj> {
    return this.service.show(args);
  }
}
