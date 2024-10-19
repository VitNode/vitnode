import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminStaffModerators } from '../show/show.dto';
import { CreateAdminStaffModeratorsArgs } from './create.dto';
import { CreateAdminStaffModeratorsService } from './create.service';

@Resolver()
export class CreateAdminStaffModeratorsResolver {
  constructor(private readonly service: CreateAdminStaffModeratorsService) {}

  @Mutation(() => ShowAdminStaffModerators)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'staff',
    permission: 'can_manage_staff_moderators',
  })
  async admin__core_staff_moderators__create(
    @Args() args: CreateAdminStaffModeratorsArgs,
  ): Promise<ShowAdminStaffModerators> {
    return this.service.create(args);
  }
}
