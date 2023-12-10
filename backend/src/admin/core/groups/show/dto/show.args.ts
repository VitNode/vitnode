import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowAdminGroupsSortingColumnEnum {
  created = 'created',
  updated = 'updated'
}

registerEnumType(ShowAdminGroupsSortingColumnEnum, {
  name: 'ShowAdminGroupsSortingColumnEnum'
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
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminGroupsSortByArgs], { nullable: true })
  sortBy: ShowAdminGroupsSortByArgs[] | null;

  @Field(() => String, { nullable: true })
  search: string | null;
}
