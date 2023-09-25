import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignOutCoreSessionsService } from './sign_out-core_sessions.service';

import { Ctx } from '@/types/context.type';

@Resolver()
export class SignOutCoreSessionsResolver {
  constructor(private readonly service: SignOutCoreSessionsService) {}

  @Mutation(() => String)
  async signOut_core_sessions(@Context() context: Ctx): Promise<string> {
    return await this.service.signOut(context);
  }
}
