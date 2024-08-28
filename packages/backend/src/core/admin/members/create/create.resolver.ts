import { SignUpCoreSessionsObj } from '@/core/sessions/sign_up/dto/sign_up.obj';
import { AdminAuthGuards, GqlContext } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { CreateAdminMembersService } from './create.service';
import { CreateAdminMembersArgs } from './dto/create.args';

@Resolver()
export class CreateAdminMembersResolver {
  constructor(private readonly service: CreateAdminMembersService) {}

  @Mutation(() => SignUpCoreSessionsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__create(
    @Args() args: CreateAdminMembersArgs,
    @Context() context: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
    return this.service.create(args, context);
  }
}
