import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignInCoreSessionsService } from './signIn-core_sessions.service';
import { SignInCoreSessionsArgs } from './dto/signIn-core_sessions.args';

import { Ctx } from '@/types/context.type';

@Resolver()
export class SignInCoreSessionsResolver {
  constructor(private readonly signInCoreSessionsService: SignInCoreSessionsService) {}

  @Mutation(() => String)
  async signIn_core_sessions(
    @Args() args: SignInCoreSessionsArgs,
    @Context() context: Ctx
  ): Promise<string> {
    return await this.signInCoreSessionsService.signIn(args, context);
  }
}
