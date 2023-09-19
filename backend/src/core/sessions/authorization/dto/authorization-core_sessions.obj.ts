import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationCoreSessionsObj {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  birthday: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => Boolean, { nullable: true })
  newsletter?: boolean;
}
