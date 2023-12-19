import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';
import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class ShowTopicsForums {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguage])
  title: TextLanguage[];

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => Int, { nullable: true })
  updated: number | null;

  @Field(() => Int)
  created: number;

  @Field(() => User)
  author: User;
}

@ObjectType()
export class ShowTopicsForumsObj {
  @Field(() => [ShowTopicsForums])
  edges: ShowTopicsForums[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
