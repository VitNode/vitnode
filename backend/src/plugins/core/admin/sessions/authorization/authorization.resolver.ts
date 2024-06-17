import { Context, Query, Resolver } from "@nestjs/graphql";
import { Ctx } from "@vitnode/backend";

import { AuthorizationAdminSessionsService } from "./authorization.service";
import { AuthorizationAdminSessionsObj } from "./dto/authorization.obj";

@Resolver()
export class AuthorizationAdminSessionsResolver {
  constructor(private readonly service: AuthorizationAdminSessionsService) {}

  @Query(() => AuthorizationAdminSessionsObj)
  async admin__sessions__authorization(
    @Context() context: Ctx
  ): Promise<AuthorizationAdminSessionsObj> {
    return this.service.authorization(context);
  }
}
