import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/src/types/database/pagination.type";
import { User } from "@/src/utils/decorators/user.decorator";
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

  @Field(() => Int)
  created: number;

  @Field(() => Int)
  updated: number;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: User | StaffGroupUser;
}
