import { TextLanguageInput } from "@/utils/types/database/text-language.type";
import { ArgsType, Field } from "@nestjs/graphql";

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
