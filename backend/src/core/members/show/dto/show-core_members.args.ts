import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

export enum ShowCoreMembersSortingColumnEnum {
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

registerEnumType(ShowCoreMembersSortingColumnEnum, {
  name: 'ShowCoreMembersSortingColumnEnum'
});

@InputType()
class SortByArgs {
  @Field(() => ShowCoreMembersSortingColumnEnum)
  column: ShowCoreMembersSortingColumnEnum;

  @Field(() => Prisma.SortOrder)
  direction: Prisma.SortOrder;
}

@ArgsType()
export class ShowCoreMembersArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int)
  first: number;

  @Field(() => [SortByArgs], { nullable: true })
  sortBy?: SortByArgs[];
}
