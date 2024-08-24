import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGuards, GqlContext } from '../../../utils';
import { SignOutCoreSessionsService } from './sign_out.service';

@Resolver()
export class SignOutCoreSessionsResolver {
  constructor(private readonly service: SignOutCoreSessionsService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_sessions__sign_out(
    @Context() context: GqlContext,
  ): Promise<string> {
    return this.service.signOut(context);
  }
}
