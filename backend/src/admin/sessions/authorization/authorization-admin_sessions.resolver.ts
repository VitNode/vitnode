import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationAdminSessionsService } from './authorization-admin_sessions.service';
import { AuthorizationAdminSessionsObj } from './dto/authorization-admin_sessions.obj';

import { Ctx } from '@/types/context.type';

@Resolver()
export class AuthorizationAdminSessionsResolver {
  constructor(private readonly service: AuthorizationAdminSessionsService) {}

  @Query(() => AuthorizationAdminSessionsObj)
  async authorization_admin_sessions(
    @Context() context: Ctx
  ): Promise<AuthorizationAdminSessionsObj> {
    return await this.service.authorization(context);
  }
}
