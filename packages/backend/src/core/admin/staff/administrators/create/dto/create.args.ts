import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminStaffAdministratorsArgs {
  @Field(() => Int, { nullable: true })
  group_id: null | number;

  @Field(() => Boolean)
  unrestricted: boolean;

  @Field(() => Int, { nullable: true })
  user_id: null | number;
}
