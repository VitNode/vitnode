import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowAdminStaffModeratorsSortingColumnEnum {
  updated = 'updated'
}

registerEnumType(ShowAdminStaffModeratorsSortingColumnEnum, {
  name: 'ShowAdminStaffModeratorsSortingColumnEnum'
});

@InputType()
class ShowAdminStaffModeratorsSortByArgs {
  @Field(() => ShowAdminStaffModeratorsSortingColumnEnum)
  column: ShowAdminStaffModeratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffModeratorsArgs {
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminStaffModeratorsSortByArgs], { nullable: true })
  sortBy: ShowAdminStaffModeratorsSortByArgs[] | null;
}
