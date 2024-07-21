import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SignOutCoreSessionsService } from './sign_out.service';

import { AuthGuards, GqlContext } from '../../../utils';

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
