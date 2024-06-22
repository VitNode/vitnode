import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo, TextLanguage } from "../../../../../utils";

@ObjectType()
export class ContentShowAdminGroups {
  @Field(() => Boolean)
  files_allow_upload: boolean;

  @Field(() => Int)
  files_total_max_storage: number;

  @Field(() => Int)
  files_max_storage_for_submit: number;
}

@ObjectType()
export class ShowAdminGroups {
  @Field(() => Int)
  id: number;

  @Field(() => [TextLanguage])
  name: TextLanguage[];

  @Field(() => Int)
  users_count: number;

  @Field(() => Date)
  created: Date;

  @Field(() => Date)
  updated: Date;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Boolean)
  root: boolean;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  guest: boolean;

  @Field(() => ContentShowAdminGroups)
  content: ContentShowAdminGroups;
}

@ObjectType()
export class ShowAdminGroupsObj {
  @Field(() => [ShowAdminGroups])
  edges: ShowAdminGroups[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
