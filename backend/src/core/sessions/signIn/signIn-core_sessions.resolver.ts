import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignInCoreSessionsService } from './signIn-core_sessions.service';
import { SignInCoreSessionsArgs } from './dto/signIn-core_sessions.args';

@Resolver()
export class SignInCoreSessionsResolver {
  constructor(private readonly signInCoreSessionsService: SignInCoreSessionsService) {}

  @Mutation(() => String)
  async signIn_core_sessions(@Args() args: SignInCoreSessionsArgs): Promise<string> {
    return await this.signInCoreSessionsService.signIn(args);
  }
}
