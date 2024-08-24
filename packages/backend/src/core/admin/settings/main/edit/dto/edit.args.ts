import { TextLanguageInput } from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditAdminMainSettingsArgs {
  @Field(() => [TextLanguageInput])
  site_copyright: TextLanguageInput[];

  @Field(() => [TextLanguageInput])
  site_description: TextLanguageInput[];

  @Field(() => String)
  site_name: string;

  @Field(() => String)
  site_short_name: string;
}
