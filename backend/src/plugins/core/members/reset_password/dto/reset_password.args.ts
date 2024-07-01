import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class ResetPasswordCoreMembersArgs {
  @Field(() => String)
  email: string;
}
