import { User } from '@/decorators';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationCurrentUserObj extends User {
  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  is_admin: boolean;

  @Field(() => Boolean)
  is_mod: boolean;

  @Field(() => Boolean)
  newsletter: boolean;
}

@ObjectType()
class FilesAuthorizationCoreSessions {
  @Field(() => Boolean)
  allow_upload: boolean;

  @Field(() => Int)
  max_storage_for_submit: number;

  @Field(() => Float)
  space_used: number;

  @Field(() => Int)
  total_max_storage: number;
}

@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => FilesAuthorizationCoreSessions)
  files: FilesAuthorizationCoreSessions;

  @Field(() => String)
  plugin_default: string;

  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;
}
