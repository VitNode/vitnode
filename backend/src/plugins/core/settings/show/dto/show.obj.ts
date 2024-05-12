import { TextLanguage } from "@/utils/types/database/text-language.type";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowSettingsObj {
  @Field(() => String)
  site_name: string;

  @Field(() => String)
  site_short_name: string;

  @Field(() => [TextLanguage])
  site_description: TextLanguage[];

  @Field(() => [TextLanguage])
  site_copyright: TextLanguage[];

  @Field(() => Number, { nullable: true })
  theme_id: number | null;
}
