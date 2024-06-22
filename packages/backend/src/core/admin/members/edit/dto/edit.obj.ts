import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class EditAdminMembersObj {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  newsletter: boolean;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => Date)
  birthday: Date;
}
