import { Field, Int, ObjectType } from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";
import {
  StaffGroupUser,
  UserOrGroupCoreStaffUnion
} from "../../../administrators/show/dto/show.obj";
import { PageInfo } from "@/utils/types/database/pagination.type";

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
