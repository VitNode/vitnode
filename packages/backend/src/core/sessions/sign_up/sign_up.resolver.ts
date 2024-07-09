import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignUpCoreSessionsObj } from './dto/sign_up.obj';
import { SignUpCoreSessionsService } from './sign_up.service';
import { SignUpCoreSessionsArgs } from './dto/sign_up.args';

import { GqlContext } from '../../../utils';

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
