import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { TransformString } from "@/types/database/text-language.type";

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
export class ShowAdminGroupsArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminGroupsSortByArgs], { nullable: true })
  sortBy: ShowAdminGroupsSortByArgs[] | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search: string | null;
}
