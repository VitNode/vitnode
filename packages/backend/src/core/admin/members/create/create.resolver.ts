import { SignUpCoreSessionsObj } from '@/core/sessions/sign_up/sign_up.dto';
import { AdminAuthGuards, AdminPermission, GqlContext } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { CreateAdminMembersArgs } from './create.dto';
import { CreateAdminMembersService } from './create.service';

@Resolver()
export class CreateAdminMembersResolver {
  constructor(private readonly service: CreateAdminMembersService) {}

  @Mutation(() => SignUpCoreSessionsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'users',
    permission: 'can_manage_members',
  })
  async admin__core_members__create(
    @Args() args: CreateAdminMembersArgs,
    @Context() context: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
    return this.service.create(args, context);
  }
}
