import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';

@ObjectType()
export class ShowAdminGroupsObj {
  @Field(() => [ShowAdminGroups])
  edges: ShowAdminGroups[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowAdminGroups {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  usersCount: number;

  @Field(() => Int)
  created: number;

  @Field(() => Boolean)
  protected: boolean;
}
