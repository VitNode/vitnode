import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowCoreMembersSortingColumnEnum {
  name = 'name',
  joined = 'joined',
  first_name = 'first_name',
  last_name = 'last_name',
  posts = 'posts',
  followers = 'followers',
  reactions = 'reactions'
}

registerEnumType(ShowCoreMembersSortingColumnEnum, {
  name: 'ShowCoreMembersSortingColumnEnum'
});

@InputType()
class ShowCoreMembersSortByArgs {
  @Field(() => ShowCoreMembersSortingColumnEnum)
  column: ShowCoreMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreMembersArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowCoreMembersSortByArgs], { nullable: true })
  sortBy: ShowCoreMembersSortByArgs[] | null;

  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => String, { nullable: true })
  name_seo: string | null;
}
