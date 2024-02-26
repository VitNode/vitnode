import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";

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
}

@ObjectType()
export class FirstShowForumForums extends ShowForumForums {
  @Field(() => PermissionsForumForumsCount)
  permissions: PermissionsForumForumsCount;
}

@ObjectType()
export class ChildrenShowForumForums extends ShowForumForums {
  @Field(() => [ShowForumForums])
  children: ShowForumForums[];
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
