import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ShowPostsForumsArgs {
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => String, { nullable: true })
  cursor_meta_tag: string | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => String)
  topic_id: string;
}
