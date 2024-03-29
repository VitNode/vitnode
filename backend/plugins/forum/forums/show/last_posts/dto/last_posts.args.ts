import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";

enum LastPostsShowForumForumsSortingColumnEnum {
  created = "created",
  updated = "updated"
}

registerEnumType(LastPostsShowForumForumsSortingColumnEnum, {
  name: "LastPostsShowForumForumsSortingColumnEnum"
});

@InputType()
class LastPostsShowForumForumsSortByArgs {
  @Field(() => LastPostsShowForumForumsSortingColumnEnum)
  column: LastPostsShowForumForumsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@InputType()
export class LastPostsShowForumForumsArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [LastPostsShowForumForumsSortByArgs], { nullable: true })
  sortBy: LastPostsShowForumForumsSortByArgs[] | null;
}
