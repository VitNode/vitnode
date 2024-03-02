import { ArgsType, Field, Int } from "@nestjs/graphql";

import { LastPostsShowForumForumsArgs } from "../last_posts/dto/last_posts.args";

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

  @Field(() => Boolean, {
    nullable: true,
    description: "Show all forums without children"
  })
  show_all_forums: boolean;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => LastPostsShowForumForumsArgs, { nullable: true })
  last_posts_args: LastPostsShowForumForumsArgs | null;
}
