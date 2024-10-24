import { GroupUser, User } from '@/decorators';
import {
  PageInfo,
  PaginationArgs,
  SortDirectionEnum,
  StringLanguage,
} from '@/utils';
import {
  ArgsType,
  createUnionType,
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  registerEnumType,
} from '@nestjs/graphql';

import {
  PermissionsStaffObj,
  PermissionsStaffObjWithoutPluginName,
} from '../permissions/dto';

enum ShowAdminStaffAdministratorsSortingColumnEnum {
  updated = 'updated',
}

registerEnumType(ShowAdminStaffAdministratorsSortingColumnEnum, {
  name: 'ShowAdminStaffAdministratorsSortingColumnEnum',
});

@InputType()
class ShowAdminStaffAdministratorsSortByArgs {
  @Field(() => ShowAdminStaffAdministratorsSortingColumnEnum)
  column: ShowAdminStaffAdministratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffAdministratorsArgs extends PaginationArgs {
  @Field(() => ShowAdminStaffAdministratorsSortByArgs, { nullable: true })
  sortBy?: ShowAdminStaffAdministratorsSortByArgs;
}

@ObjectType()
export class StaffGroupUser extends OmitType(GroupUser, ['name'] as const) {
  @Field(() => [StringLanguage])
  group_name: StringLanguage[];
}

export const UserOrGroupCoreStaffUnion = createUnionType({
  name: 'UserOrGroupCoreStaffUnion',
  types: () => [User, StaffGroupUser] as const,
  resolveType(value) {
    if (value.avatar_color) {
      return User;
    }

    if (Array.isArray(value.group_name)) {
      return StaffGroupUser;
    }

    return null;
  },
});

@ObjectType()
export class ShowAdminStaffAdministrators {
  @Field(() => Date)
  created: Date;

  @Field(() => Int)
  id: number;

  @Field(() => [PermissionsStaffObjWithoutPluginName])
  permissions: PermissionsStaffObjWithoutPluginName[];

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Date)
  updated: Date;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: StaffGroupUser | User;
}

@ObjectType()
export class ShowAdminStaffAdministratorsObj {
  @Field(() => [ShowAdminStaffAdministrators])
  edges: ShowAdminStaffAdministrators[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [PermissionsStaffObj])
  permissions: PermissionsStaffObj[];
}
