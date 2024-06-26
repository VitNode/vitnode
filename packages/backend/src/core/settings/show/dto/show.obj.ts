import { Field, ObjectType } from '@nestjs/graphql';

import { TextLanguage } from '../../../../utils';

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
}
