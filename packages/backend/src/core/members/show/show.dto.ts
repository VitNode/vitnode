import { User } from '@/decorators';
import {
  PageInfo,
  PaginationArgs,
  SortDirectionEnum,
  TextLanguage,
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

enum ShowCoreMembersSortingColumnEnum {
  first_name = 'first_name',
  followers = 'followers',
  joined = 'joined',
  last_name = 'last_name',
  name = 'name',
  posts = 'posts',
  reactions = 'reactions',
}

registerEnumType(ShowCoreMembersSortingColumnEnum, {
  name: 'ShowCoreMembersSortingColumnEnum',
});

@InputType()
class ShowCoreMembersSortByArgs {
  @Field(() => ShowCoreMembersSortingColumnEnum)
  column: ShowCoreMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreMembersArgs extends PaginationArgs {
  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  name_seo?: string;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowCoreMembersSortByArgs, { nullable: true })
  sortBy?: ShowCoreMembersSortByArgs;
}

@ObjectType()
export class ShowCoreMembersObj {
  @Field(() => [ShowCoreMembers])
  edges: ShowCoreMembers[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class GroupShowCoreMembers {
  @Field(() => [TextLanguage])
  name: TextLanguage[];
}

@ObjectType()
export class ShowCoreMembers extends User {
  @Field(() => Date)
  joined: Date;

  @Field(() => Int)
  posts: number;
}
