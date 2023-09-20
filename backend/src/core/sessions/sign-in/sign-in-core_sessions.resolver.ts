import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignInCoreSessionsService } from './sign-in-core_sessions.service';
import { SignInCoreSessionsArgs } from './dto/sign-in-core_sessions.args';

import { Ctx } from '@/types/context.type';

@Resolver()
export class SignInCoreSessionsResolver {
  constructor(private readonly service: SignInCoreSessionsService) {}

  @Mutation(() => String)
  async signIn_core_sessions(
    @Args() args: SignInCoreSessionsArgs,
    @Context() context: Ctx
  ): Promise<string> {
    return await this.service.signIn(args, context);
  }
}
