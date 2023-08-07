import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword, Matches, MaxLength, Min, MinLength } from 'class-validator';

import { nameRegex } from '../../../../../utils/regex/name.regex';

@ArgsType()
export class CreateCoreMembersArgs {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(32)
  @Matches(nameRegex)
  name: string;

  @Field(() => String)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  password: string;

  @Field(() => Int)
  @Min(10)
  birthday: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Boolean, { nullable: true })
  newsletter?: boolean;
}
