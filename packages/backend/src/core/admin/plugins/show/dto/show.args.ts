import { PaginationArgs, SortDirectionEnum } from '@/utils';
import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

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
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowAdminPluginsSortByArgs, { nullable: true })
  sortBy?: ShowAdminPluginsSortByArgs;
}
