import { AdminAuthGuards, GqlContext } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignOutAdminSessionsService } from './sign_out.service';

@Resolver()
export class SignOutAdminSessionsResolver {
  constructor(private readonly service: SignOutAdminSessionsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin_sessions__sign_out(
    @Context() context: GqlContext,
  ): Promise<string> {
    return this.service.signOut(context);
  }
}
