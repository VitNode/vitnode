import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class ChangePasswordCoreMembersArgs {
  @Field(() => String)
  key: string;

  @Field(() => String)
  password: string;
}
