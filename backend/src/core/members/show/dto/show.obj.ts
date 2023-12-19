import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';
import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class ShowCoreMembersObj {
  @Field(() => [ShowCoreMembers])
  edges: ShowCoreMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class GroupShowCoreMembers {
  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class ShowCoreMembers extends User {
  @Field(() => Int)
  joined: number;

  @Field(() => Int)
  posts: number;
}
