import { Field, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';
import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class ShowPostsForums {
  @Field(() => String)
  id: string;

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => User)
  author: User;
}

@ObjectType()
export class ShowPostsForumsObj {
  @Field(() => [ShowPostsForums])
  edges: ShowPostsForums[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
