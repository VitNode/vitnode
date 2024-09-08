import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class EditAdminMembersArgs {
  @Field(() => String)
  email: string;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  newsletter: boolean;
}

@ObjectType()
export class EditAdminMembersObj {
  @Field(() => Date, { nullable: true })
  birthday: Date | null;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  first_name: null | string;

  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  last_name: null | string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  newsletter: boolean;
}
