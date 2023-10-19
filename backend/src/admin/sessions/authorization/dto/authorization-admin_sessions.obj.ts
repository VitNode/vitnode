import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationAdminSessionsObj {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  birthday: number;

  @Field(() => Boolean, { nullable: true })
  newsletter?: boolean;

  @Field(() => Int)
  group_id: number;
}
