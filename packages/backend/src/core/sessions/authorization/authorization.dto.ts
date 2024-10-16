import { UserWithDangerousInfo } from '@/decorators';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationCurrentUserObj extends UserWithDangerousInfo {
  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => Boolean)
  is_mod: boolean;

  @Field(() => Boolean)
  newsletter: boolean;
}

@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => String)
  plugin_default: string;

  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;
}
