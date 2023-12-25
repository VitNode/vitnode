import { Field, Int, ObjectType, createUnionType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { GroupUser, User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class ShowAdminStaffAdministratorsObj {
  @Field(() => [ShowAdminStaffAdministrators])
  edges: ShowAdminStaffAdministrators[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

const UserOrGroupCoreStaffUnion = createUnionType({
  name: 'UserOrGroupCoreStaffUnion',
  types: () => [User, GroupUser] as const,
  resolveType(value) {
    if (value.avatar_color) {
      return User;
    }

    if (Array.isArray(value.name)) {
      return GroupUser;
    }

    return null;
  }
});

@ObjectType()
export class ShowAdminStaffAdministrators {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  unrestricted: boolean;

  @Field(() => Int)
  created: number;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: User | GroupUser;
}
