import { Field, Int, ObjectType, OmitType } from "@nestjs/graphql";

import { ShowForumForumsWithParent } from "../../../../../forum/forums/show/dto/show.obj";
import { PageInfo } from "@/types/database/pagination.type";

@ObjectType()
class GroupsPermissionsForumForums {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  can_view: boolean;

  @Field(() => Boolean)
  can_read: boolean;

  @Field(() => Boolean)
  can_create: boolean;

  @Field(() => Boolean)
  can_reply: boolean;
}

@ObjectType()
export class PermissionsForumForums {
  @Field(() => Boolean)
  can_all_view: boolean;

  @Field(() => Boolean)
  can_all_read: boolean;

  @Field(() => Boolean)
  can_all_create: boolean;

  @Field(() => Boolean)
  can_all_reply: boolean;

  @Field(() => [GroupsPermissionsForumForums])
  groups: GroupsPermissionsForumForums[];
}

@ObjectType()
export class ShowForumForumsAdmin extends OmitType(ShowForumForumsWithParent, [
  "permissions"
] as const) {
  @Field(() => PermissionsForumForums)
  permissions: PermissionsForumForums;
}

@ObjectType()
export class ShowForumForumsAdminObj {
  @Field(() => [ShowForumForumsAdmin])
  edges: ShowForumForumsAdmin[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
