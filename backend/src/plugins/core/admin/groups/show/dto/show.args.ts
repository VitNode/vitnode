import { PaginationArgs } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { TransformString } from "@/utils/types/database/text-language.type";
import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";
import { Transform } from "class-transformer";

enum ShowAdminGroupsSortingColumnEnum {
  created = "created",
  updated = "updated"
}

registerEnumType(ShowAdminGroupsSortingColumnEnum, {
  name: "ShowAdminGroupsSortingColumnEnum"
});

@InputType()
class ShowAdminGroupsSortByArgs {
  @Field(() => ShowAdminGroupsSortingColumnEnum)
  column: ShowAdminGroupsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminGroupsArgs extends PaginationArgs {
  @Field(() => ShowAdminGroupsSortByArgs, { nullable: true })
  sortBy: ShowAdminGroupsSortByArgs | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search: string | null;
}
