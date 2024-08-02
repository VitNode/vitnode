import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field(() => String, { nullable: true })
  first_name: string | null;

  @Field(() => String, { nullable: true })
  last_name: string | null;

  @Field(() => Date, { nullable: true })
  birthday: Date | null;
}
