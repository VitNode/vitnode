import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminStaffAdministratorsService } from './delete.service';
import { DeleteAdminStaffAdministratorsArgs } from './dto/delete.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class DeleteAdminStaffAdministratorsResolver {
  constructor(private readonly service: DeleteAdminStaffAdministratorsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_staff_administrators__admin__delete(
    @Args() args: DeleteAdminStaffAdministratorsArgs
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
