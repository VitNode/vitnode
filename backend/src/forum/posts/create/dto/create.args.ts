import { ArgsType, Field, Int } from "@nestjs/graphql";

import { TextLanguageInput } from "@/types/database/text-language.type";

@ArgsType()
export class CreatePostsForumsArgs {
  @Field(() => [TextLanguageInput])
  content: TextLanguageInput[];

  @Field(() => Int)
  topic_id: number;
}
