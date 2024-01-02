import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminStaffAdministratorsArgs {
  @Field(() => String)
  id: string;
}
