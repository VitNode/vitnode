import { ArgsType, Field, Int } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Transform } from "class-transformer";

import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput
} from "@/types/database/text-language.type";

@ArgsType()
export class CreateForumTopicsArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  title: TextLanguageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  content: TextLanguageInput[];

  @Field(() => Int)
  forum_id: number;
}
