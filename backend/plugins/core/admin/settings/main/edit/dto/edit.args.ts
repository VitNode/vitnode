import { ArgsType, Field } from "@nestjs/graphql";

import { TextLanguageInput } from "@/types/database/text-language.type";

@ArgsType()
export class EditAdminMainSettingsArgs {
  @Field(() => String)
  site_name: string;

  @Field(() => String)
  site_short_name: string;

  @Field(() => [TextLanguageInput])
  site_description: TextLanguageInput[];

  @Field(() => [TextLanguageInput])
  site_copyright: TextLanguageInput[];
}
