import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { PaginationArgs } from "@/types/database/pagination.type";

enum ShowAdminStaffModeratorsSortingColumnEnum {
  updated = "updated"
}

registerEnumType(ShowAdminStaffModeratorsSortingColumnEnum, {
  name: "ShowAdminStaffModeratorsSortingColumnEnum"
});

@InputType()
class ShowAdminStaffModeratorsSortByArgs {
  @Field(() => ShowAdminStaffModeratorsSortingColumnEnum)
  column: ShowAdminStaffModeratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffModeratorsArgs extends PaginationArgs {
  @Field(() => ShowAdminStaffModeratorsSortByArgs, { nullable: true })
  sortBy: ShowAdminStaffModeratorsSortByArgs | null;
}
