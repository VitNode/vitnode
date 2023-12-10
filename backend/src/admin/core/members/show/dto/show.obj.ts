import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { ShowCoreMembers } from '@/src/core/members/show/dto/show.obj';

@ObjectType()
export class ShowAdminMembersObj {
  @Field(() => [ShowAdminMembers])
  edges: ShowAdminMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminMembers extends ShowCoreMembers {
  @Field(() => String)
  email: string;

  @Field(() => Int)
  birthday: number;

  @Field(() => Boolean)
  newsletter: boolean;
}
