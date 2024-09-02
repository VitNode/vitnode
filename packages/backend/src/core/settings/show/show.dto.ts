import { TextLanguage } from '@/utils';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowSettingsObj {
  @Field(() => [TextLanguage])
  site_copyright: TextLanguage[];

  @Field(() => [TextLanguage])
  site_description: TextLanguage[];

  @Field(() => String)
  site_name: string;

  @Field(() => String)
  site_short_name: string;
}
