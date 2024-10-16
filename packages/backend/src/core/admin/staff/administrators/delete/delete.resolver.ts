import { AdminAuthGuards } from '@/utils';
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
  async admin__core_staff_administrators__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
