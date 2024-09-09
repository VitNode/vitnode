import { CurrentUser, User } from '@/decorators';
import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminMembersService } from './delete.service';

@Resolver()
export class DeleteAdminMembersResolver {
  constructor(private readonly service: DeleteAdminMembersService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__delete(
    @Args({ name: 'id', type: () => Number }) id: number,
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.service.delete({ id }, user);
  }
}
