import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EditAdminMembersArgs {
  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  newsletter: boolean;
}
