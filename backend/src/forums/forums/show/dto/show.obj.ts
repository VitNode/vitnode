import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';

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

  @Field(() => ShowForumForumsCount)
  _count: ShowForumForumsCount;
}

@ObjectType()
class ShowForumForumsChildren extends ShowForumForums {
  @Field(() => [ShowForumForums], { nullable: true })
  children: ShowForumForums[] | null;
}

@ObjectType()
export class ShowForumForumsWithParent extends ShowForumForums {
  @Field(() => ShowForumForums, { nullable: true })
  parent: ShowForumForums | null;

  @Field(() => [ShowForumForumsChildren], { nullable: true })
  children: ShowForumForumsChildren[] | null;
}

@ObjectType()
export class ShowForumForumsObj {
  @Field(() => [ShowForumForumsWithParent])
  edges: ShowForumForumsWithParent[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
