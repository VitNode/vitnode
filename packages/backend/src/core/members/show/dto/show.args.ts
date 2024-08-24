import { PaginationArgs, SortDirectionEnum, TransformString } from '@/utils';
import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
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
