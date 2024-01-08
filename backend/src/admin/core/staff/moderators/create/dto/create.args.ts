import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminStaffModeratorsArgs {
  @Field(() => Int, { nullable: true })
  group_id: number | null;

  @Field(() => Int, { nullable: true })
  user_id: number | null;

  @Field(() => Boolean)
  unrestricted: boolean;
}
