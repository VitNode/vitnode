import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminStaffAdministratorsService } from './delete.service';

@Resolver()
export class DeleteAdminStaffAdministratorsResolver {
  constructor(
    private readonly service: DeleteAdminStaffAdministratorsService,
  ) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'staff',
    permission: 'can_manage_staff_administrators',
  })
  async admin__core_staff_administrators__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
