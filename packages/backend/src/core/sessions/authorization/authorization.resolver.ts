import { Context, Query, Resolver } from '@nestjs/graphql';

import { GqlContext } from '../../../utils';
import { AuthorizationCoreSessionsObj } from './authorization.dto';
import { AuthorizationCoreSessionsService } from './authorization.service';

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
