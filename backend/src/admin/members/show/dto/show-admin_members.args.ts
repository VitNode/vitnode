import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowAdminMembersSortingColumnEnum {
  name = 'name',
  name_seo = 'name_seo',
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
  cursor?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => [ShowAdminMembersSortByArgs], { nullable: true })
  sortBy?: ShowAdminMembersSortByArgs[];

  @Field(() => String, { nullable: true })
  search?: string;
}
