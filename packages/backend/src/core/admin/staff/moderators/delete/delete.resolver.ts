import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminStaffModeratorsService } from './delete.service';

@Resolver()
export class DeleteAdminStaffModeratorsResolver {
  constructor(private readonly service: DeleteAdminStaffModeratorsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_moderators__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
