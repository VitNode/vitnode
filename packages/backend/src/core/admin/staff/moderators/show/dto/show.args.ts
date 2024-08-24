import { PaginationArgs, SortDirectionEnum } from '@/utils';
import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

enum ShowAdminStaffModeratorsSortingColumnEnum {
  updated = 'updated',
}

registerEnumType(ShowAdminStaffModeratorsSortingColumnEnum, {
  name: 'ShowAdminStaffModeratorsSortingColumnEnum',
});

@InputType()
class ShowAdminStaffModeratorsSortByArgs {
  @Field(() => ShowAdminStaffModeratorsSortingColumnEnum)
  column: ShowAdminStaffModeratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffModeratorsArgs extends PaginationArgs {
  @Field(() => ShowAdminStaffModeratorsSortByArgs, { nullable: true })
  sortBy?: ShowAdminStaffModeratorsSortByArgs;
}
