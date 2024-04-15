import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class EditAdminGeneralSettingsArgs {
  @Field(() => String)
  site_name: string;
}
