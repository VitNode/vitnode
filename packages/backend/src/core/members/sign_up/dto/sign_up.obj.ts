import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

import { nameRegex } from './sign_up.args';

@ObjectType()
export class SignUpCoreMembersObj {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(32)
  @Matches(nameRegex)
  name: string;

  @Field(() => Boolean, { nullable: true })
  newsletter: boolean | null;

  @Field(() => Int)
  group_id: number;
}
