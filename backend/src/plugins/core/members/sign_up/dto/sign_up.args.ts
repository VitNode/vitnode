import { ArgsType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformString } from "@/utils/types/database/text-language.type";
import { nameRegex } from "@/utils/regex/name.regex";

@ArgsType()
export class SignUpCoreMembersArgs {
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

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  @Field(() => String)
  password: string;

  @Field(() => Boolean, { nullable: true })
  newsletter: boolean | null;
}
