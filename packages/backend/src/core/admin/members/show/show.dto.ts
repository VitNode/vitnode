import { ShowCoreMembers } from '@/core/members/show/show.dto';
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

export enum ShowAdminMembersSortingColumnEnum {
  first_name = 'first_name',
  followers = 'followers',
  joined = 'joined',
  last_name = 'last_name',
  name = 'name',
  posts = 'posts',
  reactions = 'reactions',
}

registerEnumType(ShowAdminMembersSortingColumnEnum, {
  name: 'ShowAdminMembersSortingColumnEnum',
});

@InputType()
class ShowAdminMembersSortByArgs {
  @Field(() => ShowAdminMembersSortingColumnEnum)
  column: ShowAdminMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminMembersArgs extends PaginationArgs {
  @Field(() => [Int], { nullable: true })
  groups?: number[];

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowAdminMembersSortByArgs, { nullable: true })
  sortBy?: ShowAdminMembersSortByArgs;
}

@ObjectType()
export class ShowAdminMembers extends ShowCoreMembers {
  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  newsletter: boolean;
}

@ObjectType()
export class ShowAdminMembersObj {
  @Field(() => [ShowAdminMembers])
  edges: ShowAdminMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
