import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";

enum ShowAdminStaffAdministratorsSortingColumnEnum {
  updated = "updated"
}

registerEnumType(ShowAdminStaffAdministratorsSortingColumnEnum, {
  name: "ShowAdminStaffAdministratorsSortingColumnEnum"
});

@InputType()
class ShowAdminStaffAdministratorsSortByArgs {
  @Field(() => ShowAdminStaffAdministratorsSortingColumnEnum)
  column: ShowAdminStaffAdministratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffAdministratorsArgs extends PaginationArgs {
  @Field(() => ShowAdminStaffAdministratorsSortByArgs, { nullable: true })
  sortBy: ShowAdminStaffAdministratorsSortByArgs | null;
}
