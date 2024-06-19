import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PageInfo, User } from "vitnode-backend";

import {
  StaffGroupUser,
  UserOrGroupCoreStaffUnion
} from "../../../administrators/show/dto/show.obj";

@ObjectType()
export class ShowAdminStaffModeratorsObj {
  @Field(() => [ShowAdminStaffModerators])
  edges: ShowAdminStaffModerators[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminStaffModerators {
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
