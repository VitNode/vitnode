import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { PaginationArgs } from "@/types/database/pagination.type";

enum ShowAdminThemesSortingColumnEnum {
  created = "created"
}

registerEnumType(ShowAdminThemesSortingColumnEnum, {
  name: "ShowAdminThemesSortingColumnEnum"
});

@InputType()
class ShowAdminThemesSortByArgs {
  @Field(() => ShowAdminThemesSortingColumnEnum)
  column: ShowAdminThemesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminThemesArgs extends PaginationArgs {
  @Field(() => ShowAdminThemesSortByArgs, { nullable: true })
  sortBy: ShowAdminThemesSortByArgs | null;
}
