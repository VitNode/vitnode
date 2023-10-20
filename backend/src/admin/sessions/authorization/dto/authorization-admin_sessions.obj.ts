import { Field, ObjectType } from '@nestjs/graphql';

import { AuthorizationCurrentUserObj } from '@/src/core/sessions/authorization/dto/authorization-core_sessions.obj';

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user?: AuthorizationCurrentUserObj;

  @Field(() => String)
  side_name: string;
}
