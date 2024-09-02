import { AuthorizationCurrentUserObj } from '@/core/sessions/authorization/authorization.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => String)
  version: string;
}
