import { PaginationInput } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";

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
  @Field(() => LastPostsShowForumForumsSortByArgs, { nullable: true })
  sortBy: LastPostsShowForumForumsSortByArgs | null;
}
