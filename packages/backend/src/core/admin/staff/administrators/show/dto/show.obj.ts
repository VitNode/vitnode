import { GroupUser, User } from '@/decorators';
import { PageInfo, TextLanguage } from '@/utils';
import {
  createUnionType,
  Field,
  Int,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';

@ObjectType()
export class ShowAdminStaffAdministratorsObj {
  @Field(() => [ShowAdminStaffAdministrators])
  edges: ShowAdminStaffAdministrators[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class StaffGroupUser extends OmitType(GroupUser, ['name'] as const) {
  @Field(() => [TextLanguage])
  group_name: TextLanguage[];
}

export const UserOrGroupCoreStaffUnion = createUnionType({
  name: 'UserOrGroupCoreStaffUnion',
  types: () => [User, StaffGroupUser] as const,
  resolveType(value) {
    if (value.avatar_color) {
      return User;
    }

    if (Array.isArray(value.name)) {
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

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Boolean)
  unrestricted: boolean;

  @Field(() => Date)
  updated: Date;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: StaffGroupUser | User;
}
