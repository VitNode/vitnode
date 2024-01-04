import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteAdminStaffModeratorsArgs {
  @Field(() => String)
  id: string;
}
