import { ArgsType, Field, Int } from "@nestjs/graphql";

import { LastPostsShowForumForumsArgs } from "../last_posts/dto/last_posts.args";

import { PaginationArgs } from "@/types/database/pagination.type";

@ArgsType()
export class ShowForumForumsArgs extends PaginationArgs {
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
