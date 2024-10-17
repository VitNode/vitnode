import { User } from '@/decorators';
import { PageInfo, PaginationArgs, SortDirectionEnum } from '@/utils';
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import {
  StaffGroupUser,
  UserOrGroupCoreStaffUnion,
} from '../../administrators/show/show.dto';

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

@ObjectType()
export class ShowAdminStaffModeratorsObj {
  @Field(() => [ShowAdminStaffModerators])
  edges: ShowAdminStaffModerators[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminStaffModerators {
  @Field(() => Date)
  created: Date;

  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Date)
  updated: Date;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: StaffGroupUser | User;
}
