import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "@nestjs/graphql";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";

enum ShowCoreLanguagesSortingColumnEnum {
  created = "created",
  updated = "updated"
}

registerEnumType(ShowCoreLanguagesSortingColumnEnum, {
  name: "ShowCoreLanguagesSortingColumnEnum"
});

@InputType()
class ShowCoreLanguagesSortByArgs {
  @Field(() => ShowCoreLanguagesSortingColumnEnum)
  column: ShowCoreLanguagesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreLanguagesArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => [ShowCoreLanguagesSortByArgs], { nullable: true })
  sortBy: ShowCoreLanguagesSortByArgs[] | null;
}
