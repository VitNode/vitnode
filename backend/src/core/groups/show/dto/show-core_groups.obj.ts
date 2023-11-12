import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';

@ObjectType()
export class ShowCoreGroupsObj {
  @Field(() => [ShowCoreGroups])
  edges: ShowCoreGroups[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowCoreGroups {
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
