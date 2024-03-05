import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { TextLanguage } from "@/types/database/text-language.type";
import { User } from "@/utils/decorators/user.decorator";
import { BreadcrumbsForumForums } from "@/apps/forum/forums/show/dto/show.obj";

@ObjectType()
export class ForumTopicsForums {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class PermissionsTopicForums {
  @Field(() => Boolean)
  can_reply: boolean;

  @Field(() => Boolean)
  can_edit: boolean;
}

@ObjectType()
export class ShowTopicsForums {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  title: TextLanguage[];

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => Int)
  created: number;

  @Field(() => Boolean)
  locked: boolean;

  @Field(() => User)
  user: User;

  @Field(() => [BreadcrumbsForumForums])
  breadcrumbs: BreadcrumbsForumForums[];

  @Field(() => PermissionsTopicForums)
  permissions: PermissionsTopicForums;
}

@ObjectType()
export class ShowTopicsForumsObj {
  @Field(() => [ShowTopicsForums])
  edges: ShowTopicsForums[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
