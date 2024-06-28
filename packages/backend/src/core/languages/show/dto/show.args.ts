import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

import { PaginationArgs, SortDirectionEnum } from '../../../../utils';

enum ShowCoreLanguagesSortingColumnEnum {
  created = 'created',
  updated = 'updated',
}

registerEnumType(ShowCoreLanguagesSortingColumnEnum, {
  name: 'ShowCoreLanguagesSortingColumnEnum',
});

@InputType()
class ShowCoreLanguagesSortByArgs {
  @Field(() => ShowCoreLanguagesSortingColumnEnum)
  column: ShowCoreLanguagesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreLanguagesArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => ShowCoreLanguagesSortByArgs, { nullable: true })
  sortBy: ShowCoreLanguagesSortByArgs | null;
}
