import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

import { PaginationArgs, SortDirectionEnum } from '@/utils';

enum ShowAdminPluginsSortingColumnEnum {
  created = 'created',
  updated = 'updated',
}

registerEnumType(ShowAdminPluginsSortingColumnEnum, {
  name: 'ShowAdminPluginsSortingColumnEnum',
});

@InputType()
class ShowAdminPluginsSortByArgs {
  @Field(() => ShowAdminPluginsSortingColumnEnum)
  column: ShowAdminPluginsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminPluginsArgs extends PaginationArgs {
  @Field(() => ShowAdminPluginsSortByArgs, { nullable: true })
  sortBy?: ShowAdminPluginsSortByArgs;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  code?: string;
}
