import { Field, Int, ObjectType, OmitType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";

@ObjectType()
class ShowForumForumsCounts {
  @Field(() => Int)
  topics: number;

  @Field(() => Int)
  posts: number;

  @Field(() => Int)
  total_topics: number;

  @Field(() => Int)
  total_posts: number;
}

@ObjectType()
class PermissionsForumForums {
  @Field(() => Boolean)
  can_read: boolean;

  @Field(() => Boolean)
  can_create: boolean;

  @Field(() => Boolean)
  can_reply: boolean;
}

@ObjectType()
export class ShowForumForums {
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

  @Field(() => ShowForumForumsCounts)
  _count: ShowForumForumsCounts;
}

@ObjectType()
export class FirstShowForumForums extends ShowForumForums {
  @Field(() => PermissionsForumForums)
  permissions: PermissionsForumForums;
}

@ObjectType()
class LastChildShowForumForums extends OmitType(ShowForumForums, [
  "_count"
] as const) {}

@ObjectType()
export class ChildrenShowForumForums extends ShowForumForums {
  @Field(() => [LastChildShowForumForums])
  children: LastChildShowForumForums[];
}

@ObjectType()
export class ShowForumForumsWithChildren extends FirstShowForumForums {
  @Field(() => [ChildrenShowForumForums])
  children: ChildrenShowForumForums[];
}

@ObjectType()
export class ShowForumForumsObj {
  @Field(() => [ShowForumForumsWithChildren])
  edges: ShowForumForumsWithChildren[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
