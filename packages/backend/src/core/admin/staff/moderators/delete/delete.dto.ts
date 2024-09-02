import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminStaffModeratorsArgs {
  @Field(() => Int)
  id: number;
}
