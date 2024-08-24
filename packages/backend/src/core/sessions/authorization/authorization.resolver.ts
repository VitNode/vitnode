import { Context, Query, Resolver } from '@nestjs/graphql';

import { GqlContext } from '../../../utils';
import { AuthorizationCoreSessionsService } from './authorization.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization.obj';

@Resolver()
export class AuthorizationCoreSessionsResolver {
  constructor(private readonly service: AuthorizationCoreSessionsService) {}

  @Query(() => AuthorizationCoreSessionsObj)
  async core_sessions__authorization(
    @Context() context: GqlContext,
  ): Promise<AuthorizationCoreSessionsObj> {
    return this.service.authorization(context);
  }
}
