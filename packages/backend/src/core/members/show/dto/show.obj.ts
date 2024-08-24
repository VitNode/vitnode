import { User } from '@/decorators';
import { PageInfo, TextLanguage } from '@/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';

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
