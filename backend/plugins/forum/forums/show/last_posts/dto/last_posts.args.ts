import { Field, InputType, registerEnumType } from "@nestjs/graphql";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { PaginationInput } from "@/types/database/pagination.type";

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
export class LastPostsShowForumForumsArgs extends PaginationInput {
  @Field(() => [LastPostsShowForumForumsSortByArgs], { nullable: true })
  sortBy: LastPostsShowForumForumsSortByArgs[] | null;
}
