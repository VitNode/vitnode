import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';

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

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => Int)
  usersCount: number;

  @Field(() => Int)
  created: number;

  @Field(() => Boolean)
  protected: boolean;
}
