import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { SignOutAdminSessionsService } from './sign_out-admin_sessions.service';

import { Ctx } from '@/types/context.type';

@Resolver()
export class SignOutAdminSessionsResolver {
  constructor(private readonly service: SignOutAdminSessionsService) {}

  @Mutation(() => String)
  async signOut_admin_sessions(@Context() context: Ctx): Promise<string> {
    return await this.service.signOut(context);
  }
}
