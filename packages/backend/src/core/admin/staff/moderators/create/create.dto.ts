import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminStaffModeratorsArgs {
  @Field(() => Int, { nullable: true })
  group_id: null | number;

  @Field(() => Int, { nullable: true })
  user_id: null | number;
}
