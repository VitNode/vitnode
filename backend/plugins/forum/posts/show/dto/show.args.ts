import { ArgsType, Field, Int, registerEnumType } from "@nestjs/graphql";

export enum ShowPostsForumsSortingEnum {
  oldest = "oldest",
  newest = "newest"
}

registerEnumType(ShowPostsForumsSortingEnum, {
  name: "ShowPostsForumsSortingEnum"
});

@ArgsType()
export class ShowPostsForumsArgs {
  @Field(() => Int, { nullable: true })
  page: number | null;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  topic_id: number;

  @Field(() => ShowPostsForumsSortingEnum, { nullable: true })
  sortBy: ShowPostsForumsSortingEnum | null;
}
