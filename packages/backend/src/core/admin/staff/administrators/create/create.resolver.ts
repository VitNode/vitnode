import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminStaffAdministrators } from '../show/show.dto';
import { CreateAdminStaffAdministratorsArgs } from './create.dto';
import { CreateAdminStaffAdministratorsService } from './create.service';

@Resolver()
export class CreateAdminStaffAdministratorResolver {
  constructor(
    private readonly service: CreateAdminStaffAdministratorsService,
  ) {}

  @Mutation(() => ShowAdminStaffAdministrators)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_administrators__create(
    @Args() args: CreateAdminStaffAdministratorsArgs,
  ): Promise<ShowAdminStaffAdministrators> {
    return this.service.create(args);
  }
}
