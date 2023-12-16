import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

import { nameRegex } from '@/utils/regex/name.regex';

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

  @Field(() => String)
  group_id: string;
}
