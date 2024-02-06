import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class ShowForumForumsArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => Int, { nullable: true })
  parent_id: number | null;

  @Field(() => [Int], { nullable: true })
  ids: number[] | null;
}
