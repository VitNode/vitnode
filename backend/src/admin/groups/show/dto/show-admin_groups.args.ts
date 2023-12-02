import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@InputType()
class ShowAdminGroupsSortByArgs {
  @IsIn(['created', 'updated'])
  @Field(() => String)
  column: string;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminGroupsArgs {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => [ShowAdminGroupsSortByArgs], { nullable: true })
  sortBy?: ShowAdminGroupsSortByArgs[];

  @Field(() => String, { nullable: true })
  search?: string;
}
