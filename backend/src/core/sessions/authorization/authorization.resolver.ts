import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationCoreSessionsService } from './authorization.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization-core_sessions.obj';

import { Ctx } from '@/types/context.type';

@Resolver()
export class AuthorizationCoreSessionsResolver {
  constructor(private readonly service: AuthorizationCoreSessionsService) {}

  @Query(() => AuthorizationCoreSessionsObj)
  async core_sessions__authorization(
    @Context() context: Ctx
  ): Promise<AuthorizationCoreSessionsObj> {
    return await this.service.authorization(context);
  }
}
