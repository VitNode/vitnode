import { PaginationArgs, SortDirectionEnum, TransformString } from '@/utils';
import {
  ArgsType,
  Field,
  InputType,
  Int,
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
