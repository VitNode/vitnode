import {
  Field,
  Int,
  ObjectType,
  OmitType,
  createUnionType
} from "@nestjs/graphql";

import { PageInfo } from "@/src/types/database/pagination.type";
import { GroupUser, User } from "@/src/utils/decorators/user.decorator";
import { TextLanguage } from "@/src/types/database/text-language.type";

@ObjectType()
export class ShowAdminStaffAdministratorsObj {
  @Field(() => [ShowAdminStaffAdministrators])
  edges: ShowAdminStaffAdministrators[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class StaffGroupUser extends OmitType(GroupUser, ["name"] as const) {
  @Field(() => [TextLanguage])
  group_name: TextLanguage[];
}

export const UserOrGroupCoreStaffUnion = createUnionType({
  name: "UserOrGroupCoreStaffUnion",
  types: () => [User, StaffGroupUser] as const,
  resolveType(value) {
    if (value.avatar_color) {
      return User;
    }

    if (Array.isArray(value.name)) {
      return StaffGroupUser;
    }

    return null;
  }
});

@ObjectType()
export class ShowAdminStaffAdministrators {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  unrestricted: boolean;

  @Field(() => Int)
  created: number;

  @Field(() => Int)
  updated: number;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: User | StaffGroupUser;
}
