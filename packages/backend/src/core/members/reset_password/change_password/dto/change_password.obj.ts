import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangePasswordCoreMembersObj {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name_seo: string;

  @Field(() => String)
  password: string;

  @Field(() => Date)
  joined: Date;

  @Field(() => Int)
  posts: number;

  @Field(() => Boolean)
  newsletter: boolean;

  @Field(() => String)
  avatar_color: string;

  @Field(() => Int)
  group_id: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => String)
  ip_address: string;

  @Field(() => String)
  language: string;
}
