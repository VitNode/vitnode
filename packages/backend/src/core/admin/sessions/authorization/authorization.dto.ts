import { AuthorizationCurrentUserObj } from '@/core/sessions/authorization/authorization.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => Boolean)
  restart_server: boolean;

  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => String)
  version: string;
}
