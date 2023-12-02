import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@InputType()
class ShowCoreMembersSortByArgs {
  @IsIn([
    'name',
    'joined',
    'birthday',
    'first_name',
    'last_name',
    'posts',
    'followers',
    'reactions'
  ])
  @Field(() => String)
  column: string;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreMembersArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => [ShowCoreMembersSortByArgs], { nullable: true })
  sortBy?: ShowCoreMembersSortByArgs[];

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => [String], { nullable: true })
  findByIds?: string[];
}
