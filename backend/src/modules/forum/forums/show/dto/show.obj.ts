import { Field, Int, ObjectType, OmitType } from "@nestjs/graphql";

import { PageInfo } from "@/src/types/database/pagination.type";
import { TextLanguage } from "@/src/types/database/text-language.type";

@ObjectType()
class ShowForumForumsCounts {
  @Field(() => Int)
  children: number;

  @Field(() => Int)
  topics: number;

  @Field(() => Int)
  posts: number;
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
export class ShowForumForumsWithParent extends FirstShowForumForums {
  @Field(() => ShowForumForums, { nullable: true })
  parent: ShowForumForums | null;

  @Field(() => [ChildrenShowForumForums])
  children: ChildrenShowForumForums[];
}

@ObjectType()
export class ShowForumForumsObj {
  @Field(() => [ShowForumForumsWithParent])
  edges: ShowForumForumsWithParent[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
