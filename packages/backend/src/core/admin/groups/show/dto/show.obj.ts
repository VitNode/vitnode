import { GroupUser } from '@/decorators';
import { PageInfo } from '@/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentShowAdminGroups {
  @Field(() => Boolean)
  files_allow_upload: boolean;

  @Field(() => Int)
  files_max_storage_for_submit: number;

  @Field(() => Int)
  files_total_max_storage: number;
}

@ObjectType()
export class ShowAdminGroups extends GroupUser {
  @Field(() => ContentShowAdminGroups)
  content: ContentShowAdminGroups;

  @Field(() => Date)
  created: Date;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  guest: boolean;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Boolean)
  root: boolean;

  @Field(() => Date)
  updated: Date;

  @Field(() => Int)
  users_count: number;
}

@ObjectType()
export class ShowAdminGroupsObj {
  @Field(() => [ShowAdminGroups])
  edges: ShowAdminGroups[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
