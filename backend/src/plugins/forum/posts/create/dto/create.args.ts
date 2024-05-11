import { ArgsType, Field, Int } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Transform } from "class-transformer";
import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput
} from "@/utils/types/database/text-language.type";

@ArgsType()
export class CreatePostsForumsArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  content: TextLanguageInput[];

  @Field(() => Int)
  topic_id: number;
}
