import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditAdminAuthorizationSettingsArgs {
  @Field(() => Boolean)
  force_login: boolean;
}
