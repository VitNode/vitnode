import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminStaffAdministratorsArgs } from './delete.dto';
import { DeleteAdminStaffAdministratorsService } from './delete.service';

@Resolver()
export class DeleteAdminStaffAdministratorsResolver {
  constructor(
    private readonly service: DeleteAdminStaffAdministratorsService,
  ) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_administrators__delete(
    @Args() args: DeleteAdminStaffAdministratorsArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
