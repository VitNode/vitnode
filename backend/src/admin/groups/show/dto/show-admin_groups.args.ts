import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowAdminGroupsSortingColumnEnum {
  created = 'created'
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
  cursor?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => [ShowAdminGroupsSortByArgs], { nullable: true })
  sortBy?: ShowAdminGroupsSortByArgs[];

  @Field(() => String, { nullable: true })
  search?: string;
}
