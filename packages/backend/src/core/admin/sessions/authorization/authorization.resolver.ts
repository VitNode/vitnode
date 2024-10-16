import { AdminAuthGuards, GqlContext } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationAdminSessionsObj } from './authorization.dto';
import { AuthorizationAdminSessionsService } from './authorization.service';

@Resolver()
export class AuthorizationAdminSessionsResolver {
  constructor(private readonly service: AuthorizationAdminSessionsService) {}

  @Query(() => AuthorizationAdminSessionsObj)
  @UseGuards(AdminAuthGuards)
  async admin__sessions__authorization(
    @Context() context: GqlContext,
  ): Promise<AuthorizationAdminSessionsObj> {
    return this.service.authorization(context);
  }
}
