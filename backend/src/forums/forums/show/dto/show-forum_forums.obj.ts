import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';

@ObjectType()
export class ShowForumForumsObj {
  @Field(() => [ShowForumForumsWithParent])
  edges: ShowForumForumsWithParent[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
class ShowForumForumsCount {
  @Field(() => Int)
  children: number;
}
@ObjectType()
class ShowForumForums {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => [TextLanguage])
  description: TextLanguage[];

  @Field(() => Int)
  position: number;

  @Field(() => Int)
  created: number;

  @Field(() => Int)
  views: number;

  @Field(() => Boolean)
  is_category: boolean;
}

@ObjectType()
export class ShowForumForumsWithParent extends ShowForumForums {
  @Field(() => ShowForumForums)
  parent: ShowForumForums;

  @Field(() => ShowForumForumsCount)
  _count: ShowForumForumsCount;
}
