import { GroupUser } from '@/decorators';
import {
  PageInfo,
  PaginationArgs,
  SortDirectionEnum,
  TransformString,
} from '@/utils';
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Transform } from 'class-transformer';

enum ShowAdminGroupsSortingColumnEnum {
  created = 'created',
  updated = 'updated',
}

registerEnumType(ShowAdminGroupsSortingColumnEnum, {
  name: 'ShowAdminGroupsSortingColumnEnum',
});

@InputType()
class ShowAdminGroupsSortByArgs {
  @Field(() => ShowAdminGroupsSortingColumnEnum)
  column: ShowAdminGroupsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminGroupsArgs extends PaginationArgs {
  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowAdminGroupsSortByArgs, { nullable: true })
  sortBy?: ShowAdminGroupsSortByArgs;
}

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
