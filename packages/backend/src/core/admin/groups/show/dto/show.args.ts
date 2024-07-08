import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

import { PaginationArgs, SortDirectionEnum, TransformString } from '@/utils';

enum ShowAdminGroupsSortingColumnEnum {
  created = 'created',
  updated = 'updated',
}

registerEnumType(ShowAdminGroupsSortingColumnEnum, {
  name: 'ShowAdminGroupsSortingColumnEnum',
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
