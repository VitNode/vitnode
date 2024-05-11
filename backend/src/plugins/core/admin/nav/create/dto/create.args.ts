import { ArgsType, Field } from "@nestjs/graphql";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  MaxLength,
  ValidateNested
} from "class-validator";
import { Transform } from "class-transformer";
import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformString,
  TransformTextLanguageInput
} from "@/utils/types/database/text-language.type";

@ArgsType()
export class CreateAdminNavArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => Boolean)
  external: boolean;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  @MaxLength(255)
  href: string;

  @Field(() => String, { nullable: true })
  icon: string | null;
}
