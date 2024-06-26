import { Field, ObjectType } from '@nestjs/graphql';

import { AuthorizationCurrentUserObj } from '../../../../sessions/authorization/dto/authorization.obj';
import { ShowAdminNavPluginsObj } from '../../../plugins/nav/show/dto/show.obj';

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
