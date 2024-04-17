import { Field, ObjectType } from "@nestjs/graphql";

import { AuthorizationCurrentUserObj } from "@/plugins/core/sessions/authorization/dto/authorization.obj";

@ObjectType()
class ItemNavAdminPluginsAuthorization {
  @Field(() => String)
  code: string;

  @Field(() => String)
  href: string;

  @Field(() => String, { nullable: true })
  icon: string | null;
}

@ObjectType()
export class NavAdminPluginsAuthorization {
  @Field(() => String)
  code: string;

  @Field(() => [ItemNavAdminPluginsAuthorization])
  nav: ItemNavAdminPluginsAuthorization[];
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
