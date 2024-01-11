import { Field, Int, ObjectType, OmitType } from '@nestjs/graphql';

import { PageInfo } from '@/types/database/pagination.type';
import { TextLanguage } from '@/types/database/text-language.type';

@ObjectType()
class PermissionsForumForumsCount {
  @Field(() => Boolean)
  can_read: boolean;

  @Field(() => Boolean)
  can_create: boolean;

  @Field(() => Boolean)
  can_reply: boolean;
}

@ObjectType()
class ShowForumForumsCount {
  @Field(() => Int)
  children: number;
}
@ObjectType()
class ShowForumForums {
  @Field(() => Int)
  id: number;

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
class LastChildShowForumForums extends OmitType(ShowForumForums, ['_count'] as const) {}

@ObjectType()
export class FirstShowForumForums extends ShowForumForums {
  @Field(() => PermissionsForumForumsCount)
  permissions: PermissionsForumForumsCount;
}

@ObjectType()
export class ChildrenShowForumForums extends ShowForumForums {
  @Field(() => [LastChildShowForumForums], { nullable: true })
  children: LastChildShowForumForums[] | null;
}

@ObjectType()
export class ShowForumForumsWithParent extends FirstShowForumForums {
  @Field(() => ShowForumForums, { nullable: true })
  parent: ShowForumForums | null;

  @Field(() => [ChildrenShowForumForums], { nullable: true })
  children: ChildrenShowForumForums[] | null;
}

@ObjectType()
export class ShowForumForumsObj {
  @Field(() => [ShowForumForumsWithParent])
  edges: ShowForumForumsWithParent[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
