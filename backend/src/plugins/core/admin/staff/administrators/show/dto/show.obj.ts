import {
  Field,
  Int,
  ObjectType,
  OmitType,
  createUnionType
} from "@nestjs/graphql";

import { GroupUser, User } from "@/utils/decorators/user.decorator";
import { PageInfo } from "@/utils/types/database/pagination.type";
import { TextLanguage } from "@/utils/types/database/text-language.type";

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

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  updated: Date;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: StaffGroupUser | User;
}
