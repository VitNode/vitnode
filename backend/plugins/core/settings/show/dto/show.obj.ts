import { Field, ObjectType } from "@nestjs/graphql";

import { TextLanguage } from "@/types/database/text-language.type";

@ObjectType()
export class ShowSettingsObj {
  @Field(() => String)
  site_name: string;

  @Field(() => [TextLanguage])
  site_description: TextLanguage[];

  @Field(() => [TextLanguage])
  site_copyright: TextLanguage[];
}
