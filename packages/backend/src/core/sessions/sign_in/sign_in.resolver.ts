import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlContext } from '../../../utils';
import { SignInCoreSessionsArgs } from './sign_in.dto';
import { SignInCoreSessionsService } from './sign_in.service';

@Resolver()
export class SignInCoreSessionsResolver {
  constructor(private readonly service: SignInCoreSessionsService) {}

  @Mutation(() => String)
  async core_sessions__sign_in(
    @Args() args: SignInCoreSessionsArgs,
    @Context() context: GqlContext,
  ): Promise<string> {
    return this.service.signIn(args, context);
  }
}
