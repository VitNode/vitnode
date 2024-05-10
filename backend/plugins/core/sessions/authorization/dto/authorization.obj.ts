import { Field, Int, ObjectType } from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";

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
class FilesAuthorizationCoreSessions {
  @Field(() => Boolean)
  allow_upload: boolean;

  @Field(() => Int)
  total_max_storage: number;

  @Field(() => Int)
  max_storage_for_submit: number;

  @Field(() => Int)
  space_used: number;
}

@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => AuthorizationCurrentUserObj, { nullable: true })
  user: AuthorizationCurrentUserObj | null;

  @Field(() => FilesAuthorizationCoreSessions)
  files: FilesAuthorizationCoreSessions;

  @Field(() => String)
  plugin_default: string;
}
