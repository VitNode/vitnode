import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlContext } from '../../../utils';
import { SignUpCoreSessionsArgs, SignUpCoreSessionsObj } from './sign_up.dto';
import { SignUpCoreSessionsService } from './sign_up.service';

@Resolver()
export class SignUpCoreSessionsResolver {
  constructor(private readonly service: SignUpCoreSessionsService) {}

  @Mutation(() => SignUpCoreSessionsObj)
  async core_sessions__sign_up(
    @Args() args: SignUpCoreSessionsArgs,
    @Context() context: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
    return this.service.signUp(args, context);
  }
}
