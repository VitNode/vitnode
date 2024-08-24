import { TransformString } from '@/utils';
import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export const nameRegex = /^(?!.* {2})[\p{L}\p{N}._@ -]*$/u;

@ArgsType()
export class SignUpCoreSessionsArgs {
  @Transform(TransformString)
  @Field(() => String)
  @IsEmail()
  email: string;

  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(32)
  @Matches(nameRegex)
  name: string;

  @Field(() => Boolean, { nullable: true })
  newsletter?: boolean;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Field(() => String)
  password: string;
}
