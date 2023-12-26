import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminStaffAdministratorsArgs {
  @Field(() => String, { nullable: true })
  group_id: string | null;

  @Field(() => String, { nullable: true })
  member_id: string | null;

  @Field(() => Boolean)
  unrestricted: boolean;
}
