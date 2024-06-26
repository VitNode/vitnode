import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo, TextLanguage } from '../../../../utils';
import { User } from '../../../../decorators';

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
  @Field(() => Date)
  joined: Date;

  @Field(() => Int)
  posts: number;
}
