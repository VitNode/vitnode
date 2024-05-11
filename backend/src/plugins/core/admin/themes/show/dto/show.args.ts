import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

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
