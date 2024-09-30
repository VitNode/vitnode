import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ConfirmEmailAdminMembersService } from './confirm-email.service';

@Resolver()
export class ConfirmEmailAdminMembersResolver {
  constructor(private readonly service: ConfirmEmailAdminMembersService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__confirm_email(
    @Args({ name: 'id', type: () => Number }) id: number,
  ): Promise<string> {
    return this.service.confirmEmail(id);
  }
}
