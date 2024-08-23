import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminAuthorizationSettingsObj {
  @Field(() => Boolean)
  force_login: boolean;
}
