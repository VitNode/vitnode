import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

enum ShowAdminPluginsSortingColumnEnum {
  created = "created",
  updated = "updated"
}

registerEnumType(ShowAdminPluginsSortingColumnEnum, {
  name: "ShowAdminPluginsSortingColumnEnum"
});

@InputType()
class ShowAdminPluginsSortByArgs {
  @Field(() => ShowAdminPluginsSortingColumnEnum)
  column: ShowAdminPluginsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminPluginsArgs extends PaginationArgs {
  @Field(() => ShowAdminPluginsSortByArgs, { nullable: true })
  sortBy: ShowAdminPluginsSortByArgs | null;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => String, { nullable: true })
  code: string | null;
}
