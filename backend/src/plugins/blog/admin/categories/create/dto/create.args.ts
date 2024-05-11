import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput
} from "@/utils/types/database/text-language.type";
import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { ArrayMinSize, ValidateNested, IsArray } from "class-validator";

@ArgsType()
export class CreatePluginCategoriesArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @IsArray()
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => String)
  color: string;
}
