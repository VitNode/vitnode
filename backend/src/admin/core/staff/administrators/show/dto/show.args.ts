import { ArgsType, Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';

export enum ShowAdminStaffAdministratorsSortingColumnEnum {
  updated = 'updated'
}

registerEnumType(ShowAdminStaffAdministratorsSortingColumnEnum, {
  name: 'ShowAdminStaffAdministratorsSortingColumnEnum'
});

@InputType()
class ShowAdminStaffAdministratorsSortByArgs {
  @Field(() => ShowAdminStaffAdministratorsSortingColumnEnum)
  column: ShowAdminStaffAdministratorsSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminStaffAdministratorsArgs {
  @Field(() => String, { nullable: true })
  cursor: string | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminStaffAdministratorsSortByArgs], { nullable: true })
  sortBy: ShowAdminStaffAdministratorsSortByArgs[] | null;
}
