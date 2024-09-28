import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class VerifyConfirmEmailCoreSessionsArgs {
  @Field(() => String)
  token: string;

  @Field(() => Number)
  user_id: number;
}
