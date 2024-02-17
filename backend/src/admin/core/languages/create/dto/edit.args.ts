import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateCoreAdminLanguagesArgs {
  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  timezone: string;
}
