import { User } from '@/decorators';
import { PageInfo } from '@/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  StaffGroupUser,
  UserOrGroupCoreStaffUnion,
} from '../../../administrators/show/dto/show.obj';

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

  @Field(() => Boolean)
  unrestricted: boolean;

  @Field(() => Date)
  updated: Date;

  @Field(() => UserOrGroupCoreStaffUnion)
  user_or_group: StaffGroupUser | User;
}
