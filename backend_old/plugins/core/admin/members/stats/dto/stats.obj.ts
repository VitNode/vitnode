import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignUpStatsAdminMembers {
  @Field(() => String)
  joined_date: string;

  @Field(() => Int)
  users_joined: number;
}
