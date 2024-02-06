import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class EditGeneralAdminSettingsArgs {
  @Field(() => String)
  side_name: string;
}
