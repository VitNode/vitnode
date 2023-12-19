import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class AuthorizationCurrentUserObj extends User {
  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  newsletter: boolean;
}
@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;
}
