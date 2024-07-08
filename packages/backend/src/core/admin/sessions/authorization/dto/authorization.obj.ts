import { Field, ObjectType } from '@nestjs/graphql';

import { ShowAdminNavPluginsObj } from '@/core/admin/plugins/nav/show/dto/show.obj';
import { AuthorizationCurrentUserObj } from '@/core/sessions/authorization/dto/authorization.obj';

@ObjectType()
export class NavAdminPluginsAuthorization {
  @Field(() => String)
  code: string;

  @Field(() => [ShowAdminNavPluginsObj])
  nav: ShowAdminNavPluginsObj[];
}

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => String)
  version: string;

  @Field(() => [NavAdminPluginsAuthorization])
  nav: NavAdminPluginsAuthorization[];
}
