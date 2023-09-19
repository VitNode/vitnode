import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationCoreSessionsService } from './authorization-core_sessions.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization-croe_sessions.obj';

import { Ctx } from '@/types/context.type';

@Resolver()
export class AuthorizationCoreSessionsResolver {
  constructor(
    private readonly authorizationCoreSessionsService: AuthorizationCoreSessionsService
  ) {}

  @Query(() => AuthorizationCoreSessionsObj)
  async authorization_core_sessions(
    @Context() context: Ctx
  ): Promise<AuthorizationCoreSessionsObj> {
    return await this.authorizationCoreSessionsService.authorization(context);
  }
}
