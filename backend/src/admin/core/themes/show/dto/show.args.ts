import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

enum ShowAdminThemesSortingColumnEnum {
  created = 'created'
}

registerEnumType(ShowAdminThemesSortingColumnEnum, {
  name: 'ShowAdminThemesSortingColumnEnum'
});

@InputType()
class ShowAdminThemesSortByArgs {
  @Field(() => ShowAdminThemesSortingColumnEnum)
  column: ShowAdminThemesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminThemesArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminThemesSortByArgs], { nullable: true })
  sortBy: ShowAdminThemesSortByArgs[] | null;
}
