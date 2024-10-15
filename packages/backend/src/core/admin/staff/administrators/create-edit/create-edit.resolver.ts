import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminStaffAdministrators } from '../show/show.dto';
import { CreateEditAdminStaffAdministratorsArgs } from './create-edit.dto';
import { CreateEditAdminStaffAdministratorsService } from './create-edit.service';

@Resolver()
export class CreateEditAdminStaffAdministratorResolver {
  constructor(
    private readonly service: CreateEditAdminStaffAdministratorsService,
  ) {}

  @Mutation(() => ShowAdminStaffAdministrators)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_administrators__create_edit(
    @Args() args: CreateEditAdminStaffAdministratorsArgs,
  ): Promise<ShowAdminStaffAdministrators> {
    return this.service.create(args);
  }
}
