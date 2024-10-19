import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminStaffModeratorsService } from './delete.service';

@Resolver()
export class DeleteAdminStaffModeratorsResolver {
  constructor(private readonly service: DeleteAdminStaffModeratorsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'staff',
    permission: 'can_manage_staff_moderators',
  })
  async admin__core_staff_moderators__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
