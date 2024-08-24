import { PaginationArgs, SortDirectionEnum } from '@/utils';
import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

enum ShowAdminStaffAdministratorsSortingColumnEnum {
  updated = 'updated',
}

registerEnumType(ShowAdminStaffAdministratorsSortingColumnEnum, {
  name: 'ShowAdminStaffAdministratorsSortingColumnEnum',
});

@InputType()
class ShowAdminStaffAdministratorsSortByArgs {
  @Field(() => ShowAdminStaffAdministratorsSortingColumnEnum)
  column: ShowAdminStaffAdministratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffAdministratorsArgs extends PaginationArgs {
  @Field(() => ShowAdminStaffAdministratorsSortByArgs, { nullable: true })
  sortBy?: ShowAdminStaffAdministratorsSortByArgs;
}
