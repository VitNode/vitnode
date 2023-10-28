import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowCoreGroupsSortingColumnEnum {
  name = 'name',
  created = 'created'
}

registerEnumType(ShowCoreGroupsSortingColumnEnum, {
  name: 'ShowCoreGroupsSortingColumnEnum'
});

@InputType()
class ShowCoreGroupsSortByArgs {
  @Field(() => ShowCoreGroupsSortingColumnEnum)
  column: ShowCoreGroupsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreGroupsArgs {
  @Field(() => Int, { nullable: true })
  cursor?: number;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => [ShowCoreGroupsSortByArgs], { nullable: true })
  sortBy?: ShowCoreGroupsSortByArgs[];

  @Field(() => String, { nullable: true })
  search?: string;
}
