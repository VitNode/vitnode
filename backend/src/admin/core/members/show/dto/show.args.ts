import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowAdminMembersSortingColumnEnum {
  name = 'name',
  joined = 'joined',
  birthday = 'birthday',
  first_name = 'first_name',
  last_name = 'last_name',
  posts = 'posts',
  followers = 'followers',
  reactions = 'reactions'
}

registerEnumType(ShowAdminMembersSortingColumnEnum, {
  name: 'ShowAdminMembersSortingColumnEnum'
});

@InputType()
class ShowAdminMembersSortByArgs {
  @Field(() => ShowAdminMembersSortingColumnEnum)
  column: ShowAdminMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminMembersArgs {
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminMembersSortByArgs], { nullable: true })
  sortBy: ShowAdminMembersSortByArgs[] | null;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => [String], { nullable: true })
  groups: string[] | null;
}
