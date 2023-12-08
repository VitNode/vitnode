import { ArgsType, Field } from '@nestjs/graphql';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class CreateForumForumsArgs {
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => String, { nullable: true })
  parent_id: string | null;

  @Field(() => Boolean, { nullable: true })
  is_category: boolean | null;
}
