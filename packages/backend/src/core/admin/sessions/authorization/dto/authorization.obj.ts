import { Field, ObjectType } from '@nestjs/graphql';

import { AuthorizationCurrentUserObj } from '@/core/sessions/authorization/dto/authorization.obj';

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => String)
  version: string;
}
