import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminStaffModeratorsArgs } from './delete.dto';
import { DeleteAdminStaffModeratorsService } from './delete.service';

@Resolver()
export class DeleteAdminStaffModeratorsResolver {
  constructor(private readonly service: DeleteAdminStaffModeratorsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_staff_moderators__delete(
    @Args() args: DeleteAdminStaffModeratorsArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
