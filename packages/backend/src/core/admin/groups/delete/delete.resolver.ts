import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminGroupsService } from './delete.service';
import { DeleteAdminGroupsArgs } from './dto/delete.args';

import { AdminAuthGuards } from '../../../../utils';

@Resolver()
export class DeleteAdminGroupsResolver {
  constructor(private readonly service: DeleteAdminGroupsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_groups__delete(
    @Args() args: DeleteAdminGroupsArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
