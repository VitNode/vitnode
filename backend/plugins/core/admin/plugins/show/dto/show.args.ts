import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "@nestjs/graphql";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";

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
export class ShowAdminPluginsArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminPluginsSortByArgs], { nullable: true })
  sortBy: ShowAdminPluginsSortByArgs[] | null;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => String, { nullable: true })
  code: string | null;
}
