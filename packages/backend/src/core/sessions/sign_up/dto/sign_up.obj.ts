import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

import { nameRegex } from './sign_up.args';

@ObjectType()
export class SignUpCoreSessionsObj {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => Int)
  group_id: number;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(32)
  @Matches(nameRegex)
  name: string;

  @Field(() => Boolean, { nullable: true })
  newsletter: boolean | null;
}
