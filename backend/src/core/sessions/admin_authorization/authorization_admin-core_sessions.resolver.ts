import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationAdminCoreSessionsService } from './authorization_admin_authorization-core_sessions.service';
import { AuthorizationAdminCoreSessionsObj } from './dto/authorization_admin-core_sessions.obj';

import { Ctx } from '@/types/context.type';

@Resolver()
export class AuthorizationAdminCoreSessionsResolver {
  constructor(private readonly service: AuthorizationAdminCoreSessionsService) {}

  @Query(() => AuthorizationAdminCoreSessionsObj)
  async authorization_core_sessions(
    @Context() context: Ctx
  ): Promise<AuthorizationAdminCoreSessionsObj> {
    return await this.service.authorization(context);
  }
}
