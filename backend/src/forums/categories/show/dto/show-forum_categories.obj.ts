import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';

@ObjectType()
export class ShowForumCategoriesObj {
  @Field(() => [ShowForumCategories])
  edges: ShowForumCategories[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class ShowForumCategories {
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
}
