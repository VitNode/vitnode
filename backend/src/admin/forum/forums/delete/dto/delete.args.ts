import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class DeleteForumForumsArgs {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  move_forums_to: number | null;

  @Field(() => Int, { nullable: true })
  move_topics_to: number | null;
}
