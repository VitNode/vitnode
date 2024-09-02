import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateKeyResetPasswordCoreMembersArgs {
  @Field(() => String)
  email: string;
}
