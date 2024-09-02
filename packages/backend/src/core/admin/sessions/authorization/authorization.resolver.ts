import { GqlContext } from '@/utils';
import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationAdminSessionsObj } from './authorization.dto';
import { AuthorizationAdminSessionsService } from './authorization.service';

@Resolver()
export class AuthorizationAdminSessionsResolver {
  constructor(private readonly service: AuthorizationAdminSessionsService) {}

  @Query(() => AuthorizationAdminSessionsObj)
  async admin__sessions__authorization(
    @Context() context: GqlContext,
  ): Promise<AuthorizationAdminSessionsObj> {
    return this.service.authorization(context);
  }
}
