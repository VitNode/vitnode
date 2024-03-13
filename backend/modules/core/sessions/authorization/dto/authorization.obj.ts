import { Field, Int, ObjectType } from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";
import { RebuildRequiredObj } from "@/modules/core/admin/sessions/authorization/dto/authorization.obj";

@ObjectType()
export class AuthorizationCurrentUserObj extends User {
  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => Boolean)
  is_mod: boolean;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  newsletter: boolean;
}
@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => Int, { nullable: true })
  theme_id: number | null;

  @Field(() => RebuildRequiredObj)
  rebuild_required: RebuildRequiredObj;

  @Field(() => String)
  plugin_default: string;
}
