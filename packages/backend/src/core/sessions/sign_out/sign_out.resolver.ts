import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignOutCoreSessionsService } from './sign_out.service';

import { GqlContext } from '../../../utils';

@Resolver()
export class SignOutCoreSessionsResolver {
  constructor(private readonly service: SignOutCoreSessionsService) {}

  @Mutation(() => String)
  async core_sessions__sign_out(
    @Context() context: GqlContext,
  ): Promise<string> {
    return this.service.signOut(context);
  }
}
