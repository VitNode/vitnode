import { Context, Query, Resolver } from '@nestjs/graphql';

import { AdminAuthorizationCoreSessionsService } from './admin_authorization-core_sessions.service';
import { AdminAuthorizationCoreSessionsObj } from './dto/admin_authorization-core_sessions.obj';

import { Ctx } from '@/types/context.type';

@Resolver()
export class AdminAuthorizationCoreSessionsResolver {
  constructor(private readonly service: AdminAuthorizationCoreSessionsService) {}

  @Query(() => AdminAuthorizationCoreSessionsObj)
  async admin_authorization_core_sessions(
    @Context() context: Ctx
  ): Promise<AdminAuthorizationCoreSessionsObj> {
    return await this.service.authorization(context);
  }
}
