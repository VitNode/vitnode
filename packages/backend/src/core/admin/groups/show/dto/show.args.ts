import { PaginationArgs, SortDirectionEnum, TransformString } from '@/utils';
import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

enum ShowAdminGroupsSortingColumnEnum {
  created = 'created',
  updated = 'updated',
}

registerEnumType(ShowAdminGroupsSortingColumnEnum, {
  name: 'ShowAdminGroupsSortingColumnEnum',
});

@InputType()
class ShowAdminGroupsSortByArgs {
  @Field(() => ShowAdminGroupsSortingColumnEnum)
  column: ShowAdminGroupsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminGroupsArgs extends PaginationArgs {
  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowAdminGroupsSortByArgs, { nullable: true })
  sortBy?: ShowAdminGroupsSortByArgs;
}
