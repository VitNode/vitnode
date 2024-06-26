import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminStaffAdministratorsArgs {
  @Field(() => Int)
  id: number;
}
