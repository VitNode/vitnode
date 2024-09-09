import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminGroupsService } from './delete.service';

@Resolver()
export class DeleteAdminGroupsResolver {
  constructor(private readonly service: DeleteAdminGroupsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_groups__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
