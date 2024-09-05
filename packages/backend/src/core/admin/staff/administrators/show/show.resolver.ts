import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  ShowAdminStaffAdministratorsArgs,
  ShowAdminStaffAdministratorsObj,
} from './show.dto';
import { ShowAdminStaffAdministratorsService } from './show.service';

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
