import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminStaffModeratorsArgs } from './dto/delete.args';
import { DeleteAdminStaffModeratorsService } from './delete.service';

import { AdminAuthGuards } from '@/utils';

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
