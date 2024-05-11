import { Field, Int, ObjectType } from "@nestjs/graphql";

import { User } from "@/utils/decorators/user.decorator";
import { BreadcrumbsForumForums } from "@/plugins/forum/forums/show/dto/show.obj";
import { TextLanguage } from "@/utils/types/database/text-language.type";
import { PageInfo } from "@/utils/types/database/pagination.type";

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

  @Field(() => Boolean)
  can_download_files: boolean;
}

@ObjectType()
export class ShowTopicsForums {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  title: TextLanguage[];

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => Date)
  created: Date;

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
