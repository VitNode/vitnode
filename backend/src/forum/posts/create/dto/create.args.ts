import { ArgsType, Field } from '@nestjs/graphql';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class CreatePostsForumsArgs {
  @Field(() => [TextLanguageInput])
  content: TextLanguageInput;

  @Field(() => String)
  topic_id: string;
}
